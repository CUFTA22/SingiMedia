import React from "react";
import { Helmet } from "react-helmet";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import "./styles.css";
import { Globe } from "./Globe";
import { Logo } from "./Logo";

const index = () => {
  return (
    <div className="canvas">
      <Helmet>
        <title>WebGL | Singi Media</title>
        <meta
          name="description"
          content="Singi Media PWA is a platform for sharing GitHub code on the web. It is a single page application built in React with a bunch of other libraries that make a modern web application. WebGL planet"
        />
      </Helmet>
      <React.Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <OrbitControls
            maxPolarAngle={Math.PI / 2.8}
            minPolarAngle={Math.PI / 3.2}
            enableDamping
          />
          <Stars count={1400} />
          <ambientLight intensity={1} />
          <spotLight position={[0, 10, 10]} penumbra={1} />
          <Globe />
        </Canvas>
      </React.Suspense>
    </div>
  );
};

export default index;
