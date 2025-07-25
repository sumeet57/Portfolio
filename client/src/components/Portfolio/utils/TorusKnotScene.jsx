import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TorusKnot from "./TorusKnot";
import { Bloom, ToneMapping } from "@react-three/postprocessing";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const TorusKnotScene = () => {
  const texture = useTexture("./TorusKnot.jpg");

  const isPossible = window.innerWidth < 768;
  return (
    isPossible && (
      <mesh>
        <torusKnotGeometry args={[1, 0.4, 30, 30]} />
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    )
  );
};

export default TorusKnotScene;
