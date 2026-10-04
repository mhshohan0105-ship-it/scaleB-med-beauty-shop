"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Soft "photo studio" lighting. The environment map is built from
 * Lightformers in-scene, so no HDR file is downloaded.
 */
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#fbe7e8" />
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#dfe5ee"]} />
        <Lightformer form="rect" intensity={2.2} position={[0, 5, -2]} scale={[10, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-5, 1, 1]}
          scale={[3, 6, 1]}
          rotation-y={Math.PI / 2}
          color="#d9f3e8"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[5, 1, 1]}
          scale={[3, 6, 1]}
          rotation-y={-Math.PI / 2}
          color="#fbe7e8"
        />
        <Lightformer form="circle" intensity={2.5} position={[0, 1, 6]} scale={2} />
      </Environment>
    </>
  );
}
