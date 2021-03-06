import * as THREE from 'three';
import { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import randomColor from 'randomcolor';
import CameraControls from 'camera-controls';
import { OrbitControls } from '@react-three/drei';

CameraControls.install({ THREE });

// Setting onClick Controls
function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
  vec2 = new THREE.Vector3(),
  orb,
  setOrb,
}) {
  // innit new camera for useMemo
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
      // type of control
      controls.setLookAt(
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z + 0.002,
        look.x,
        look.y,
        look.z,
        true
      );
    }
    return controls.update(delta);
  });
}

function Sphere ({sphere, position, setOrb, zoomToView}){
  return(
    <mesh   
    ref={sphere}     
    onClick={(e) => {
      setOrb(false);
      zoomToView(e.object.position, console.log(e.object.position))
    }}position={position}>
      <sphereBufferGeometry args={[0.5,11,6]}/>
      <meshStandardMaterial color={'green'}/>
    </mesh>
  );
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

export default function App({sphere}) {
  const [orb, setOrb] = useState();
  const [zoom, setZoom] = useState(0);
  const [focus, setFocus] = useState({});

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
        <Sphere ref={sphere} position={[2,2,0]} setOrb={setOrb}
         zoomToView={(focusRef) => (setZoom(+2), setFocus(focusRef))} />
      <Cacaboubou 
         setOrb={setOrb}
         zoomToView={(focusRef) => (setZoom(+2), setFocus(focusRef))}/>
      <Controls  orb={orb} setOrb={setOrb} zoom={zoom} focus={focus} />
    </Canvas>
  );
}
