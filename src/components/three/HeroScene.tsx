"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PerformanceMonitor } from "@react-three/drei";
import { Capsule, CosmeticJar, PillBottle } from "./Models";
import { Studio } from "./Studio";

/** Normalised (-1..1) window pointer, shared by the rig without re-rendering React. */
function useWindowPointer() {
  const pointer = useRef(new THREE.Vector2());
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/** Tilts the whole composition gently towards the mouse. */
function PointerRig({ pointer, children }: { pointer: React.RefObject<THREE.Vector2>; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = 1 - Math.pow(0.02, delta); // frame-rate independent easing
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.35, t);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.current.y * 0.18, t);
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.current.x * 0.15, t);
  });
  return <group ref={group}>{children}</group>;
}

function Spinner({
  speed,
  children,
  ...props
}: { speed: number; children: React.ReactNode } & React.ComponentProps<"group">) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  );
}

export default function HeroScene({ active = true, onReady }: { active?: boolean; onReady?: () => void }) {
  const [dpr, setDpr] = useState(1.5);
  const pointer = useWindowPointer();

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.2, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))}
      aria-hidden
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Studio />

      <PointerRig pointer={pointer}>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <group position={[-1.05, 0.3, 0]} rotation={[0.08, 0, -0.14]}>
            <Spinner speed={0.3}>
              <PillBottle color="#ffffff" accent="#3ba57e" brand="scaleB" />
            </Spinner>
          </group>
        </Float>

        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
          <group position={[1.2, -0.75, 0.7]} rotation={[0.28, 0, 0.1]} scale={0.88}>
            <Spinner speed={-0.22}>
              <CosmeticJar color="#f6cfd2" accent="#e9d7b8" brand="scaleB" />
            </Spinner>
          </group>
        </Float>

        <Float speed={2} rotationIntensity={1.4} floatIntensity={1.4}>
          <group position={[1.65, 1.35, -0.6]} rotation={[0.4, 0, 0.9]}>
            <Capsule colorA="#5bbf98" colorB="#ffffff" />
          </group>
        </Float>
        <Float speed={1.7} rotationIntensity={1.2} floatIntensity={1.2}>
          <group position={[-2.1, -1.1, 0.4]} rotation={[0.2, 0, -0.7]} scale={0.8}>
            <Capsule colorA="#e4838c" colorB="#ffffff" />
          </group>
        </Float>
        <Float speed={2.2} floatIntensity={1.6}>
          <mesh position={[0.1, 1.7, -1]}>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshPhysicalMaterial color="#efabb1" roughness={0.1} clearcoat={1} />
          </mesh>
        </Float>
      </PointerRig>

      <ContactShadows position={[0, -1.85, 0]} opacity={0.3} scale={9} blur={2.8} far={4} resolution={256} color="#172240" />
    </Canvas>
  );
}
