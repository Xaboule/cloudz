import { MeshReflectorMaterial} from "@react-three/drei";

export default function Ground(){

  return(
    <mesh rotation={[-(Math.PI*0.5), 0, 0]} position={[0,0,0]}  castShadow receiveShadow>
      <planeBufferGeometry args={[60,60, 70, 70]} />
      <MeshReflectorMaterial color={'yellow'}
/>
    </mesh>
  )

}