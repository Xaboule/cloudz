import * as THREE from 'three';
import { useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import randomColor from 'randomcolor';
import CameraControls from 'camera-controls';
import { OrbitControls } from '@react-three/drei';

CameraControls.install({ THREE });
const randomPos = (min = 2, max = -2) => Math.random() * (max - min) + min;

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
  vec2 = new THREE.Vector3(),
  orb,
  setOrb,
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(
    () => new CameraControls(camera, gl.domElement),
    [camera, gl.domElement]
  );
  return useFrame((state, delta) => {
    if (!orb) {
      zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5);
      zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4); 
      state.camera.position.lerp( pos,  0.15);
      state.camera.updateProjectionMatrix();

      controls.setLookAt(
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z + 0.002,
        look.x,
        look.y,
        look.z,
        true
      );
      // controls.dollyTo(
      //   2 , true
      // )
    }
    return controls.update(delta);
  });
}

function Cloud({ momentsData, zoomToView, setOrb }) {
  return momentsData.map(({ position, color }, i) => (
    <mesh
      key={i}
      position={position}
      onClick={(e) => {
        setOrb(false);
        zoomToView(e.object.position, console.log(e.object.position));
      }}
    >
      <boxGeometry args={[0.1, 0.08, 0.03]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ));
}
function Cacaboubou({setOrb, zoomToView}) {
  return (
    <mesh       
    onClick={(e) => {
      setOrb(false);
      zoomToView(e.object.position, console.log(e.object.position));
    }}>
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}

export default function App() {
  const [orb, setOrb] = useState();
  const [zoom, setZoom] = useState(0);
  const [focus, setFocus] = useState({});
  // const momentsArray = useMemo(
  //   () =>
  //     Array.from({ length: 50 }, () => ({
  //       color: randomColor(),
  //       position: [randomPos(), randomPos(), randomPos()],
  //     })),
  //   []
  // );
  return (
    <Canvas linear camera={{fov: 75, near: 0.01, far: 100}}>
      <OrbitControls
        onStart={(event) => {
          setOrb(true);
          console.log(event.target);
        }}
        // onEnd={()=> {setOrb(false)}}
      />
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
      {/* <Cloud
        setOrb={setOrb}
        momentsData={momentsArray}
        zoomToView={(focusRef) => (setZoom(+2), setFocus(focusRef))}
      /> */}
      <Cacaboubou 
         setOrb={setOrb}
         zoomToView={(focusRef) => (setZoom(+2), setFocus(focusRef))}/>
      <Controls  orb={orb} setOrb={setOrb} zoom={zoom} focus={focus} />
    </Canvas>
  );
}
