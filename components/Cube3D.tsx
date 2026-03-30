import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, MeshTransmissionMaterial, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SectionType } from '../types';

interface SceneProps {
  currentSection: SectionType;
}

const GeometricForm = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  // Responsive scale
  const scale = Math.min(viewport.width, viewport.height) * 0.3;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Elegant slow rotation
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    meshRef.current.rotation.y = Math.cos(t * 0.15) * 0.2;
    
    // Counter rotation for inner core
    wireframeRef.current.rotation.x = t * 0.1;
    wireframeRef.current.rotation.y = t * 0.1;

    // Mouse parallax
    const x = (mouseRef.current.x * viewport.width) / 4;
    const y = (mouseRef.current.y * viewport.height) / 4;
    
    meshRef.current.position.x += (x - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (y - meshRef.current.position.y) * 0.05;
  });

  const materialProps = useMemo(() => ({
    thickness: 1.2,
    roughness: 0.1,
    transmission: 1,
    ior: 1.3,
    chromaticAberration: 0.06,
    backside: true,
    samples: 4,
    resolution: 512,
  }), []);

  return (
    <Float floatIntensity={1} rotationIntensity={0.5} speed={1}>
      <group>
        {/* Main Glass Shape */}
        <Icosahedron ref={meshRef} args={[1, 0]}>
          <MeshTransmissionMaterial {...materialProps} color="#f0f0f0" />
        </Icosahedron>
        
        {/* Wireframe Core - Symbolizing Structure/Code */}
        <Icosahedron ref={wireframeRef} args={[0.7, 1]}>
          <meshBasicMaterial wireframe color="#444" transparent opacity={0.15} />
        </Icosahedron>
      </group>
    </Float>
  );
};

const Scene3D: React.FC<SceneProps> = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        
        {/* Lighting Setup for Studio Look */}
        <Environment preset="studio" blur={1} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow />
        
        <GeometricForm />
        
        {/* Subtle shadow to ground the floating object */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
};

export default Scene3D;