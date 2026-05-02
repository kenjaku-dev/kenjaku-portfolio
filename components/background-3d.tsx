'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (state.mouse.x * state.viewport.width) / 10, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * state.viewport.height) / 10, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function AmbientShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[4, 1, -5]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#4F46E5"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-4, -1, -6]} scale={1.2} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1, 0.4, 64, 128]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={1.5}
          />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, -4, -8]} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#ec4899"
            envMapIntensity={1}
            clearcoat={1}
            metalness={0.7}
            roughness={0.3}
            distort={0.1}
            speed={3}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen opacity-60">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <CameraRig />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#4F46E5" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />
        <Sparkles count={150} scale={20} size={4} speed={0.4} opacity={0.3} color="#8b5cf6" />
        <Sparkles count={100} scale={15} size={6} speed={0.2} opacity={0.2} color="#ffffff" />
        
        <AmbientShapes />
      </Canvas>
    </div>
  );
}
