import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TorusKnotScene from "./TorusKnotScene";
import { Bloom, ToneMapping } from "@react-three/postprocessing";
const TorusKnot = () => {
  return (
    <Canvas camera={{ fov: 40 }}>
      <ambientLight intensity={10} />
      <OrbitControls
        enableZoom={false}
        rotateSpeed={7}
        autoRotate={true}
        autoRotateSpeed={4}
      />
      <TorusKnotScene />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0} intensity={30} />
      <ToneMapping adaptive={true} />
    </Canvas>
  );
};

export default TorusKnot;
