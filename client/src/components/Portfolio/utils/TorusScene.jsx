import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Bloom, ToneMapping } from "@react-three/postprocessing";
const TorusScene = () => {
  return (
    <Canvas flat camera={{ position: [0, 0, 15], fov: 30 }}>
      <ambientLight intensity={2.4} />
      <Bloom luminanceThreshold={40} luminanceSmoothing={0} intensity={20} />
      <ToneMapping adaptive={true} />
      <OrbitControls enableZoom={false} enablePan={false} />

      <Scene />
    </Canvas>
  );
};

export default TorusScene;
