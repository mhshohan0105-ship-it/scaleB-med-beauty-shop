"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import type { PackShape } from "@/data/products";
import { ProductModel } from "./Models";
import { Studio } from "./Studio";

export default function ProductScene({
  shape,
  color,
  accent,
  brand,
  onReady,
}: {
  shape: PackShape;
  color: string;
  accent: string;
  brand: string;
  onReady?: () => void;
}) {
  const [dpr, setDpr] = useState(1.5);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.4, 6.4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <Studio />
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <ProductModel shape={shape} color={color} accent={accent} brand={brand} />
      </Float>
      <ContactShadows position={[0, -1.6, 0]} opacity={0.3} scale={7} blur={2.6} far={3} resolution={256} color="#172240" />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={9}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.75}
        autoRotate={autoRotate}
        autoRotateSpeed={1.6}
        onStart={() => setAutoRotate(false)}
      />
    </Canvas>
  );
}
