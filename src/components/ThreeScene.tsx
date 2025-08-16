import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useMouse } from "../hooks/useMouse";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  varying vec2 vUv;
  
  // bruit simplex (version simplifiée)
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // dithering
  float dither(vec2 position, float brightness) {
    float threshold = random(position * 0.5);
    return brightness > threshold ? 1.0 : 0.0;
  }
  
  // Gradient radial with mouse interaction
  float getGradient(vec2 uv, vec2 mouse) {
    vec2 center = mouse * 0.5 + 0.5; // Normalize mouse position
    float distance = length(uv - center);
    return 1.0 - smoothstep(0.0, 1.5, distance);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // time-based animation
    float timeWave = sin(u_time * 0.5) * 0.1;

    // Gradient with mouse interaction
    float gradient = getGradient(uv, u_mouse);

    // Add time-based variation
    gradient += timeWave;

    // Pattern with movement
    float pattern = sin(uv.x * 20.0 + u_time) * sin(uv.y * 20.0 + u_time * 0.7) * 0.1;
    gradient += pattern;

    // Apply dithering
    float dithered = dither(gl_FragCoord.xy, gradient);

    // Dithering colors
    vec3 color1 = vec3(0.05, 0.05, 0.1); // Very dark blue
    vec3 color2 = vec3(0.2, 0.3, 0.6);   // Medium blue
    
    vec3 finalColor = mix(color1, color2, dithered);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameId = useRef<number | null>(null);

  const { mouseX, mouseY } = useMouse();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() },
    }),
    []
  );

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Set refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;

    // Update resolution
    uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);

    // Animation loop
    const animate = (time: number) => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_time.value = time * 0.001;
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (rendererRef.current && materialRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        rendererRef.current.setSize(width, height);
        materialRef.current.uniforms.u_resolution.value.set(width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [uniforms]);

  // Update mouse position
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_mouse.value.set(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1
      );
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1 }}
    />
  );
};

export default ThreeScene;
