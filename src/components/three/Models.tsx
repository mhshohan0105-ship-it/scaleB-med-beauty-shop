"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import type { PackShape } from "@/data/products";

/**
 * Procedural packaging models built from simple Three.js primitives.
 * Every model is ~2.4 units tall and centred on the origin.
 */

export interface PackProps {
  color: string;
  accent: string;
  brand: string;
}

/** Side profile of a cylinder with rounded top/bottom edges, for LatheGeometry. */
function roundedProfile(radius: number, height: number, bevel: number, steps = 8) {
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, -height / 2)];
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI / 2 + (i / steps) * (Math.PI / 2);
    pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, -height / 2 + bevel + Math.sin(a) * bevel));
  }
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * (Math.PI / 2);
    pts.push(new THREE.Vector2(radius - bevel + Math.cos(a) * bevel, height / 2 - bevel + Math.sin(a) * bevel));
  }
  pts.push(new THREE.Vector2(0, height / 2));
  return pts;
}

function useRoundedCylinder(radius: number, height: number, bevel: number) {
  return useMemo(() => new THREE.LatheGeometry(roundedProfile(radius, height, bevel), 64), [radius, height, bevel]);
}

/** Paper label printed with the brand name, drawn on a canvas. */
function useLabelTexture(brand: string, accent: string, aspect = 4) {
  return useMemo(() => {
    const w = 1024;
    const h = Math.round(w / aspect);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = accent;
    ctx.fillRect(0, h * 0.8, w, h * 0.2);
    ctx.fillStyle = "#172240";
    ctx.font = `600 ${Math.round(h * 0.34)}px Georgia, 'Times New Roman', serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(brand, w / 2, h * 0.4);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [brand, accent, aspect]);
}

function Glossy({ color, roughness = 0.18 }: { color: string; roughness?: number }) {
  return <meshPhysicalMaterial color={color} roughness={roughness} metalness={0.05} clearcoat={1} clearcoatRoughness={0.08} />;
}

function Label({ radius, height, y, brand, accent, arc = 1.25 }: { radius: number; height: number; y: number; brand: string; accent: string; arc?: number }) {
  const thetaLength = Math.PI * arc;
  const aspect = (radius * thetaLength) / height;
  const map = useLabelTexture(brand, accent, aspect);
  return (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius, height, 64, 1, true, -thetaLength / 2, thetaLength]} />
      <meshStandardMaterial map={map} roughness={0.55} side={THREE.FrontSide} />
    </mesh>
  );
}

export function PillBottle({ color, accent, brand }: PackProps) {
  const body = useRoundedCylinder(0.62, 1.7, 0.16);
  return (
    <group>
      <mesh geometry={body} position={[0, -0.35, 0]} castShadow>
        <Glossy color={color} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.2, 48]} />
        <Glossy color={color} />
      </mesh>
      <mesh position={[0, 0.86, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.42, 48]} />
        <Glossy color={accent} roughness={0.3} />
      </mesh>
      {/* Grip ridges on the cap */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.51, 0.51, 0.3, 48, 1, true]} />
        <meshStandardMaterial color={accent} roughness={0.6} wireframe transparent opacity={0.25} />
      </mesh>
      <Label radius={0.625} height={0.8} y={-0.4} brand={brand} accent={accent === "#ffffff" ? "#3ba57e" : accent} />
    </group>
  );
}

export function CosmeticJar({ color, accent, brand }: PackProps) {
  const body = useRoundedCylinder(1, 1.05, 0.22);
  const lid = useRoundedCylinder(1.04, 0.5, 0.12);
  return (
    <group>
      <mesh geometry={body} position={[0, -0.35, 0]} castShadow>
        <Glossy color={color} roughness={0.12} />
      </mesh>
      <mesh geometry={lid} position={[0, 0.42, 0]} castShadow>
        <meshPhysicalMaterial color={accent} roughness={0.22} metalness={0.55} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <Label radius={1.005} height={0.42} y={-0.35} brand={brand} accent={accent} arc={0.9} />
    </group>
  );
}

export function DropperBottle({ color, accent, brand }: PackProps) {
  const body = useRoundedCylinder(0.6, 1.5, 0.18);
  return (
    <group>
      <mesh geometry={body} position={[0, -0.45, 0]} castShadow>
        <meshPhysicalMaterial color={color} roughness={0.05} clearcoat={1} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.3, 0.38, 0.22, 48]} />
        <Glossy color={color} />
      </mesh>
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.36, 48]} />
        <meshPhysicalMaterial color={accent} roughness={0.25} metalness={0.6} clearcoat={1} />
      </mesh>
      <mesh position={[0, 1.12, 0]} scale={[0.3, 0.46, 0.3]} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#172240" roughness={0.55} />
      </mesh>
      <Label radius={0.605} height={0.6} y={-0.5} brand={brand} accent={accent} />
    </group>
  );
}

export function PumpBottle({ color, accent, brand }: PackProps) {
  const body = useRoundedCylinder(0.66, 1.75, 0.3);
  return (
    <group>
      <mesh geometry={body} position={[0, -0.32, 0]} castShadow>
        <Glossy color={color} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.24, 48]} />
        <Glossy color={accent} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 16]} />
        <Glossy color={accent} />
      </mesh>
      <RoundedBox args={[0.42, 0.16, 0.42]} radius={0.06} position={[0, 1.08, 0]} castShadow>
        <Glossy color={accent} />
      </RoundedBox>
      <mesh position={[0.32, 1.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.32, 16]} />
        <Glossy color={accent} />
      </mesh>
      <Label radius={0.665} height={0.75} y={-0.35} brand={brand} accent="#3ba57e" />
    </group>
  );
}

export function SqueezeTube({ color, accent, brand }: PackProps) {
  const arc = Math.PI * 0.7;
  const map = useLabelTexture(brand, accent, (0.52 * arc) / 0.7);
  return (
    <group>
      {/* Flattened, tapered cylinder reads as a squeeze tube */}
      <group scale={[1, 1, 0.55]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.42, 1.9, 48]} />
          <Glossy color={color} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.562, 0.488, 0.7, 48, 1, true, -arc / 2, arc]} />
          <meshStandardMaterial map={map} roughness={0.5} />
        </mesh>
      </group>
      <RoundedBox args={[1.28, 0.14, 0.12]} radius={0.04} position={[0, 1.08, 0]}>
        <Glossy color={color} />
      </RoundedBox>
      <mesh position={[0, -1.06, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.34, 48]} />
        <Glossy color={accent} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function MedicineBox({ color, accent, brand }: PackProps) {
  const map = useLabelTexture(brand, accent, 1.25);
  return (
    <group>
      <RoundedBox args={[1.5, 1.9, 0.62]} radius={0.05} castShadow>
        <meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.72, 0.312]}>
        <planeGeometry args={[1.46, 0.36]} />
        <meshStandardMaterial color={accent} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.12, 0.312]}>
        <planeGeometry args={[1.3, 1.04]} />
        <meshStandardMaterial map={map} roughness={0.45} />
      </mesh>
    </group>
  );
}

export function ProductModel({ shape, ...props }: PackProps & { shape: PackShape }) {
  switch (shape) {
    case "bottle":
      return <PillBottle {...props} />;
    case "jar":
      return <CosmeticJar {...props} />;
    case "dropper":
      return <DropperBottle {...props} />;
    case "pump":
      return <PumpBottle {...props} />;
    case "tube":
      return <SqueezeTube {...props} />;
    case "box":
      return <MedicineBox {...props} />;
  }
}

/** Small decorative capsule pill for the hero scene. */
export function Capsule({ colorA, colorB }: { colorA: string; colorB: string }) {
  return (
    <group>
      <mesh position={[0, 0.16, 0]}>
        <capsuleGeometry args={[0.16, 0.32, 8, 24]} />
        <Glossy color={colorA} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <capsuleGeometry args={[0.161, 0.32, 8, 24]} />
        <Glossy color={colorB} roughness={0.1} />
      </mesh>
    </group>
  );
}
