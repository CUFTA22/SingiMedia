import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

export const Globe = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.2, 1.2, 1.2] : [1.6, 1.6, 1.6],
    color: hovered ? "yellow" : "white",
  });

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.001;
  });

  console.log("render");

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      ref={mesh}
      // scale={props.scale}
      //rotation={[0.5, 0, 0]}
      position={[0, -0.4, 0]}
    >
      <sphereBufferGeometry attach="geometry" args={[2.2, 16, 16]} />
      <a.meshPhysicalMaterial
        // wireframe
        attach="material"
        // color={props.color}
      />
    </a.mesh>
  );
};
