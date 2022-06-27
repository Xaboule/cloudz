import * as THREE from 'three';
import { useState, useMemo} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import Ground from './Ground';
import { OrbitControls } from '@react-three/drei';

CameraControls.install({ THREE });
// Setting onClick Controls
function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
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
  // const bbHelper = new THREE.Mesh(
  //   new THREE.BoxGeometry( 1, 1, 1 ),
  //   new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
  // );
  // bbHelper.visible = false;
  // const bb = new THREE.Box3(
	// 	new THREE.Vector3( -5.0, -5.0, -5.0 ),
	// 	new THREE.Vector3( 5.0, 5.0, 5.0 )
	// );
	// controls.setBoundary( bb );

	// bbHelper.position.set( 0, 0, 0 );
	// bbHelper.scale.set( 10, 10, 10 );
	// bbHelper.visible = true;


  // useFrame(() => {
  //   camera.position.x = THREE.MathUtils.clamp(camera.position.x, -90, 90)
  //   camera.position.y = THREE.MathUtils.clamp(camera.position.y, -5, 90)
  // })
  return useFrame((state, delta) => {
    if (!orb) {
      zoom ? pos.set(focus.x, focus.y, focus.z + 4) : pos.set(0, 0, 5);
      zoom ? look.set(focus.x, focus.y, focus.z - 4) : look.set(0, 0, 4); 
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
     controls.maxPolarAngle= 1.49;
     controls.maxDistance = 20;
    //  controls.maxAzimuthAngle= 2;

      // controls.maxZoom=2;
    return controls.update(delta);
  });
}

function Sphere ({focus, sphere, position, setOrb, zoomToView}){
  // position = position.set(focus.x, focus.y+2, focus.z + 0.2)
  return(
    <mesh   
    ref={sphere}     
    onClick={(e) => {
      setOrb(false);
      zoomToView(e.object.position, console.log(e.object.position)) 
    }}position={position}>
      <sphereBufferGeometry args={[0.15,60, 60 ]}/>
      <meshStandardMaterial color={'green'}/>
    </mesh>
  );
}

function Cacaboubou({cac, position, setOrb, zoomToView}) {
  return (
    <mesh  
    ref={cac}
    position={position}     
    onClick={(e) => {
      setOrb(false);
      zoomToView(e.object.position, console.log(e.object.position));
    }}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  );
}

export default function App({sphere, cac}) {
  const [orb, setOrb] = useState();
  const [zoom, setZoom] = useState(0);
  const [focus, setFocus] = useState({});

  return (
    <Canvas linear camera={{fov: 70, near: 0.01, far: 100 }}>
      <OrbitControls
        onStart={(event) => {
          setOrb(true);
          console.log(event.target);
        }}
        // enablePan={false}
      maxPolarAngle={1.49}
      minDistance={5} maxDistance={20} makeDefault 
// onEnd={()=> {setOrb(false)}}
      />
  

      <ambientLight />
      {/* <directionalLight position={[150, 150, 150]} intensity={2}  color={'lightblue'} castShadow/> */}
        <Sphere ref={sphere} position={[2,0.1,0]} setOrb={setOrb}
         zoomToView={(focusRef) => (setZoom(+2), setFocus(focusRef))} />
         <spotLight color={"lightblue"} instensity={3} penumbra={0.2}/>
      <Cacaboubou     ref={cac} position={[0,1,0]}
         setOrb={setOrb}
         zoomToView={(focusRef) => (setZoom(-2), setFocus(focusRef))}/>
         <Ground receiveShadow castShadow/>
      <Controls   enablePan={false} orb={orb} zoom={zoom} focus={focus} />
    </Canvas>
  );
}
