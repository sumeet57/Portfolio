import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import {
  Bloom,
  ToneMapping,
  EffectComposer,
} from "@react-three/postprocessing";
const TorusScene = () => {
  return (
    <Canvas flat camera={{ position: [0, 0, 15], fov: 30 }}>
      <ambientLight intensity={2.4} />
      <EffectComposer>
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={4} intensity={1} /> */}
        {/* <ToneMapping /> */}
      </EffectComposer>
      <OrbitControls enableZoom={false} enablePan={false} />

      <Scene />
    </Canvas>
  );
};

export default TorusScene;
