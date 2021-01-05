import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { TextureLoader } from "three";
import singi from "../assets/SingiLogo.svg";

export const Logo = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const texture = new TextureLoader().load(singi);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
  });

  console.log("render");

  return (
    <mesh ref={mesh} scale={[0.6, 2, 2]} position={[0, -0.4, 0]}>
      <sphereBufferGeometry attach="geometry" args={[2.2, 20, 20]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};
