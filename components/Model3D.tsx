import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);

  // Rotation automatique lente
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={1.5} />;
}

interface Model3DProps {
  modelPath: string;
}

const Model3D: React.FC<Model3DProps> = ({ modelPath }) => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-black/40 to-black/20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={1} />
        <Model modelPath={modelPath} />
        <OrbitControls 
          enableZoom={true}
          minDistance={2}
          maxDistance={5}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Model3D;
