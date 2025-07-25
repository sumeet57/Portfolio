import React, { useContext } from "react";
import { useTexture } from "@react-three/drei";
// import { cylinderGeometry } from "three";
import * as THREE from "three";
import { PortfolioContext } from "../../../Context/Portfolio.context";

const Scene = () => {
  const { geometryXRotate } = useContext(PortfolioContext);
  const tex = useTexture("./Merged.png");
  return (
    <mesh rotation={[0.2, geometryXRotate, 0.1]}>
      <cylinderGeometry args={[4, 4, 5, 30, 50, true]} />
      <meshStandardMaterial
        map={tex}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Scene;
