import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// Helper function to create data texture
function createDataTexture(width: number, height: number) {
  const size = width * height;
  const data = new Uint8Array(4 * size);

  // Initialize with stable neutral value (0.5) to avoid flickering
  for (let i = 0; i < size; i++) {
    const stride = i * 4;
    data[stride] = 128;     // R: 0.5 in normalized range
    data[stride + 1] = 128; // G: 0.5 in normalized range  
    data[stride + 2] = 128; // B: 0.5 in normalized range
    data[stride + 3] = 255; // A: 1.0
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
}

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Buffer shader for wave propagation
const bufferShader = `
  varying vec2 vUv;
  uniform float iFrame;
  uniform vec4 iMouse;
  uniform vec3 iResolution;
  uniform sampler2D iChannel0;
  uniform sampler2D iChannel1;
  uniform float iTime;

  void main()
  {
   vec3 e = vec3(vec2(1.)/iResolution.xy,0.);
   vec2 q = vUv;
   
   vec2 coord = q * iResolution.xy;
   vec2 mouseCoord = vec2(iMouse.x, iResolution.y - iMouse.y);

   vec4 c = texture2D(iChannel0, q);
   
   float p11 = c.x;
   
   float p10 = texture2D(iChannel1, q-e.zy).x;
   float p01 = texture2D(iChannel1, q-e.xz).x;
   float p21 = texture2D(iChannel1, q+e.xz).x;
   float p12 = texture2D(iChannel1, q+e.zy).x;
   
   float d = 0.;
    
   if (iMouse.z > 0.) 
   {
      // Mouse interaction
      float dist = length(iMouse.xy - coord);
      d = smoothstep(15.0, 2.0, dist) * 0.6;
   }

   // The actual propagation
   d += -(p11-.5)*2. + (p10 + p01 + p21 + p12 - 2.); // Back to normal propagation
   d *= .992; // Light dampening - compromise between stability and duration
   d *= smoothstep(0., 30., float(iFrame)); // smooth initialization instead of hard cutoff
   d = d*.5 + .5;

   gl_FragColor = vec4(d, 0, 0, 0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform sampler2D u_waveTexture; // Wave texture from buffer
  
  varying vec2 vUv;

  // ASCII character shapes
  float sdOrientedBox(in vec2 p, in vec2 a, in vec2 b, float th) {
    float l = length(b - a);
    vec2 d = (b - a) / l;
    vec2 q = p - (a + b) * 0.5;
    q = mat2(d.x, -d.y, d.y, d.x) * q;
    q = abs(q) - vec2(l * 0.5, th);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  float sdCross(in vec2 p, float th, float crossRadius) {
    float upper = 1. - crossRadius;
    float lower = 0. + crossRadius;

    vec2 v1 = vec2(lower, upper);
    vec2 v12 = vec2(upper, lower);
    vec2 v2 = vec2(lower, lower);
    vec2 v22 = vec2(upper, upper);

    float d1 = sdOrientedBox(p, v1, v12, th);
    float d2 = sdOrientedBox(p, v2, v22, th);

    d1 = step(d1, 0.01);
    d2 = step(d2, 0.01);

    return d1 + d2;
  }

  float square(in vec2 p, float radius) {
    float x = step(radius, p.x) - step(1. - radius, p.x);
    float y = step(radius, p.y) - step(1. - radius, p.y);
    return x * y;
  }

  float line(in vec2 p, float radius) {
    float upper = 1. - radius;
    float lower = 0. + radius;

    vec2 v1 = vec2(lower, lower);
    vec2 v12 = vec2(upper, upper);

    return step(sdOrientedBox(p, v1, v12, 0.028), 0.01);
  }

  float getGridColor(in vec2 p, float noise) {
    if(noise <= 0.25) {
      return square(p, 0.46) - 0.6;
    }
    if(noise > 0.25 && noise <= 0.5) {
      return line(p, 0.68);
    }
    if(noise > 0.5 && noise <= 0.75) {
      return sdCross(p, 0.028, 0.68);
    }
    if(noise > 0.75) {
      return square(p, 0.94);
    }
    return 0.0;
  }

  void main() {
    vec2 uv = vUv;
    float ratio = u_resolution.x / u_resolution.y;
    float gridSize = 50.0;

    // Create proper square grid cells by adjusting coordinates
    vec2 squareUV;
    if (ratio > 1.0) {
      // Landscape: stretch X to maintain square cells
      squareUV = vec2(uv.x * ratio, uv.y);
    } else {
      // Portrait: stretch Y to maintain square cells  
      squareUV = vec2(uv.x, uv.y / ratio);
    }

    vec2 squareUV1 = squareUV * gridSize;
    vec2 squareUV1_i = floor(squareUV1);
    vec2 squareUV1_f = fract(squareUV1);

    // normalized UV to sample wave texture (keep original UV)
    vec2 normalGrid = uv * gridSize;
    vec2 normalGrid_i = floor(normalGrid);
    vec2 uv_img = normalGrid_i / gridSize;
    
    // Get wave data from buffer
    float h = texture2D(u_waveTexture, uv_img).x;
    h -= 0.3;

    // Use wave data instead of perlin noise
    float color = getGridColor(squareUV1_f, h);
    color *= 0.8; // Slightly brighter

    gl_FragColor = vec4(vec3(color), 1.0);
  }
`;

// Buffer management classes
class BufferShader {
  uniforms: { [key: string]: THREE.IUniform };
  material: THREE.ShaderMaterial;
  scene: THREE.Scene;

  constructor(
    fragmentShader: string,
    uniforms: { [key: string]: THREE.IUniform } = {}
  ) {
    this.uniforms = uniforms;
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: uniforms,
    });
    this.scene = new THREE.Scene();
    this.scene.add(
      new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material)
    );
  }
}

class BufferManager {
  renderer: THREE.WebGLRenderer;
  readBuffer: THREE.WebGLRenderTarget;
  writeBuffer: THREE.WebGLRenderTarget;

  constructor(
    renderer: THREE.WebGLRenderer,
    size: { width: number; height: number }
  ) {
    this.renderer = renderer;

    this.readBuffer = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      stencilBuffer: false,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });

    this.writeBuffer = this.readBuffer.clone();
  }

  swap() {
    const temp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = temp;
  }

  render(scene: THREE.Scene, camera: THREE.Camera, toScreen = false) {
    if (toScreen) {
      this.renderer.render(scene, camera);
    } else {
      this.renderer.setRenderTarget(this.writeBuffer);
      this.renderer.clear();
      this.renderer.render(scene, camera);
      this.renderer.setRenderTarget(null);
    }
    this.swap();
  }
}

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number | null>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_waveTexture: { value: null as THREE.Texture | null },
    }),
    []
  );

  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Setup renderer and camera
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const mousePosition = new THREE.Vector4();
    let frameCounter = 0;
    const startTime = performance.now();
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseStopTimeout: number | null = null;

    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create buffer managers (ping-pong system)
    const targetA = new BufferManager(renderer, { width, height });
    const targetB = new BufferManager(renderer, { width, height });

    // Create initial texture
    const initialTexture = createDataTexture(width, height);
    const resolution = new THREE.Vector3(
      width,
      height,
      window.devicePixelRatio
    );

    // Create buffer shaders for wave propagation
    const bufferA = new BufferShader(bufferShader, {
      iFrame: { value: 0 },
      iMouse: { value: mousePosition },
      iResolution: { value: resolution },
      iChannel0: { value: initialTexture },
      iChannel1: { value: initialTexture },
      iTime: { value: 0 },
    });

    const bufferB = new BufferShader(bufferShader, {
      iFrame: { value: 0 },
      iMouse: { value: mousePosition },
      iResolution: { value: resolution },
      iChannel0: { value: initialTexture },
      iChannel1: { value: initialTexture },
      iTime: { value: 0 },
    });

    // Create main display material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    scene.add(mesh);

    // Update resolution
    uniforms.u_resolution.value.set(width, height);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Update renderer size
      renderer.setSize(newWidth, newHeight);
      
      // Update shader resolution uniform
      uniforms.u_resolution.value.set(newWidth, newHeight);
      
      // Update buffer resolution (recreate them with new size)
      targetA.readBuffer.setSize(newWidth, newHeight);
      targetA.writeBuffer.setSize(newWidth, newHeight);
      targetB.readBuffer.setSize(newWidth, newHeight);
      targetB.writeBuffer.setSize(newWidth, newHeight);
      
      // Update buffer shader resolutions
      bufferA.uniforms["iResolution"].value.set(newWidth, newHeight, window.devicePixelRatio);
      bufferB.uniforms["iResolution"].value.set(newWidth, newHeight, window.devicePixelRatio);
      
      // Reinitialize buffers with neutral texture to prevent flickering
      const newInitialTexture = createDataTexture(newWidth, newHeight);
      bufferA.uniforms["iChannel0"].value = newInitialTexture;
      bufferA.uniforms["iChannel1"].value = newInitialTexture;
      bufferB.uniforms["iChannel0"].value = newInitialTexture;
      bufferB.uniforms["iChannel1"].value = newInitialTexture;
      
      // Render a few neutral frames to stabilize
      targetA.render(bufferA.scene, camera);
      targetB.render(bufferB.scene, camera);
      targetA.render(bufferA.scene, camera);
      targetB.render(bufferB.scene, camera);
    };

    window.addEventListener('resize', handleResize);

    // Mouse events
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      // check if mouse actually moved
      if (x !== lastMouseX || y !== lastMouseY) {
        // Reset stop timer
        if (mouseStopTimeout) {
          clearTimeout(mouseStopTimeout);
        }

        // Stop effect after 80ms of no movement (compromise)
        mouseStopTimeout = setTimeout(() => {
          mousePosition.setZ(0); // Disable effect
        }, 80);

        // Update position
        mousePosition.setX(x);
        mousePosition.setY(height - y);
        mousePosition.setZ(1); // Enable effect

        lastMouseX = x;
        lastMouseY = y;
      }
    };

    // Just track mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize buffers with neutral state to prevent flickering
    targetA.render(bufferA.scene, camera);
    targetB.render(bufferB.scene, camera);
    
    // Animation loop
    const animate = (currentTime: number) => {
      const elapsedTime = (currentTime - startTime) * 0.001; // Convert to seconds
      frameCounter++;

      // Update buffer shaders with time-based values
      bufferA.uniforms["iFrame"].value = frameCounter;
      bufferB.uniforms["iFrame"].value = frameCounter;
      bufferA.uniforms["iTime"].value = elapsedTime;
      bufferB.uniforms["iTime"].value = elapsedTime;

      // Ping-pong rendering with proper buffer management
      bufferA.uniforms["iChannel0"].value = targetA.readBuffer.texture;
      bufferA.uniforms["iChannel1"].value = targetB.readBuffer.texture;
      targetA.render(bufferA.scene, camera);

      bufferB.uniforms["iChannel0"].value = targetB.readBuffer.texture;
      bufferB.uniforms["iChannel1"].value = targetA.readBuffer.texture;
      targetB.render(bufferB.scene, camera);

      // Update main shader with wave texture
      uniforms.u_waveTexture.value = targetA.readBuffer.texture;
      uniforms.u_time.value = elapsedTime;

      // Render final scene
      renderer.render(scene, camera);

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      // clean timeout
      if (mouseStopTimeout) {
        clearTimeout(mouseStopTimeout);
      }

      // Remove event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      targetA.readBuffer.dispose();
      targetA.writeBuffer.dispose();
      targetB.readBuffer.dispose();
      targetB.writeBuffer.dispose();
    };
  }, [uniforms]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1 }}
    />
  );
};

export default ThreeScene;
