import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TorusKnotScene from "./TorusKnotScene";
import {
  Bloom,
  ToneMapping,
  EffectComposer,
} from "@react-three/postprocessing";
const TorusKnot = () => {
  return (
    <Canvas camera={{ fov: 40 }}>
      <ambientLight intensity={10} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        rotateSpeed={1}
        autoRotate={true}
        autoRotateSpeed={3}
      />
      <TorusKnotScene />
    </Canvas>
  );
};

export default TorusKnot;
