import * as THREE from "three";
import { useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import randomColor from "randomcolor";
import CameraControls from "camera-controls";
import { OrbitControls } from "@react-three/drei";

CameraControls.install({ THREE });
// const randomPos = (min = 5, max = -5) => Math.random() * (max - min) + min;

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  // const camera = useThree((state) => state.camera);
  // const gl = useThree((state) => state.gl);
  //const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);

 // const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl.domElement]);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5);
  //  zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4);

     state.camera.position.lerp(pos, 0.25);
    // state.camera.updateProjectionMatrix();

//     controls.setLookAt(
//       state.camera.position.x,
//       state.camera.position.y,
//       state.camera.position.z,
//       look.x,
//       look.y,
//       look.z,
//       true
//     );
//     return controls.update(delta);
  });
}

function Cacaboubou(){
  return(
    <mesh>
      <boxGeometry args={[2,2,2]}/>
      <meshStandardMaterial color={'hotpink'} wireframe/>
    </mesh>
  )
}

export default function App() {
  // const [zoom, setZoom] = useState(false);
  // const [focus, setFocus] = useState({});

  return (
    <Canvas linear camera={{ position: [0, 0, 5] }}>
      <OrbitControls/>
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
 
      <Cacaboubou
       //zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
       />
      <Controls 
     // zoom={zoom} focus={focus}
       />
    </Canvas>
  );
}
