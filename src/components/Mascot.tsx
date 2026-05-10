"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function MascotModel() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth reaction to mouse
    const x = (state.mouse.x * Math.PI) / 10;
    const y = (state.mouse.y * Math.PI) / 10;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x, 0.1);
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Face Sphere */}
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial 
            color={hovered ? "#FFB6C1" : "#4A90E2"} 
            speed={2} 
            distort={0.2} 
            radius={1}
            transmission={0.8}
            thickness={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Eyes */}
        <group position={[0, 0, 0.85]}>
          <mesh position={[-0.3, 0.1, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
          <mesh position={[0.3, 0.1, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
        </group>

        {/* Smile */}
        <mesh position={[0, -0.2, 0.85]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI / 1]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>

        {/* Single Curl */}
        <mesh position={[0, 1.1, 0]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.2, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
      </Float>
    </group>
  );
}

export default function Mascot() {
  return (
    <div className="w-full h-full min-h-[400px] cursor-pointer">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <MascotModel />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
