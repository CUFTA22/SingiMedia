import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

export const Globe = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
  });

  console.log("render");

  return (
    <mesh ref={mesh} scale={[1.8, 1.8, 1.8]} position={[0, -0.4, 0]}>
      <sphereBufferGeometry attach="geometry" args={[2.2, 20, 20]} />
      <meshPhysicalMaterial wireframe attach="material" />
    </mesh>
  );
};
