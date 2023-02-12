import * as THREE from 'three'
import React, { forwardRef, MutableRefObject, useEffect, useRef } from 'react'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube006: THREE.Mesh
    Cube006_1: THREE.Mesh
    white_box4: THREE.Mesh
    Cube021: THREE.Mesh
    Cube021_1: THREE.Mesh
    Cylinder011: THREE.Mesh
    Cylinder011_1: THREE.Mesh
  }
  materials: {
    box_body: THREE.MeshStandardMaterial
    grind_metal: THREE.MeshStandardMaterial
    grind_base: THREE.MeshStandardMaterial
    tea_marker: THREE.MeshStandardMaterial
  }
}

interface ItemsProps {
  name: string
  temp: boolean
  visible?: boolean
  position?: THREE.Vector3
}

const Items = forwardRef<THREE.Group, ItemsProps>(({ name, temp, position, visible = true, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/models/items.glb') as unknown as GLTFResult

  const items = {
    box: (
      <mesh {...props}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color={0xff0000} side={THREE.DoubleSide} transparent opacity={temp ? 0.3 : 1} />
      </mesh>
    ),
    sphere: (
      <mesh {...props}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={0xff0000} side={THREE.DoubleSide} transparent opacity={temp ? 0.3 : 1} />
      </mesh>
    ),

    blue_box: (
      <group>
        <mesh
          {...props}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.box_body}
          material-transparent={true}
          material-opacity={temp ? 0.3 : 1}
        />
        <mesh
          {...props}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
          geometry={nodes.Cube006_1.geometry}
          material={materials.grind_metal}
          material-transparent={true}
          material-opacity={temp ? 0.3 : 1}
        />
      </group>
    ),
    white_box: (
      <mesh {...props} castShadow receiveShadow geometry={nodes.white_box4.geometry} material={materials.grind_metal} />
    ),
    tea_box: (
      <group {...props}>
        <mesh castShadow receiveShadow geometry={nodes.Cube021.geometry} material={materials.grind_base} />
        <mesh castShadow receiveShadow geometry={nodes.Cube021_1.geometry} material={materials.tea_marker} />
      </group>
    ),
    tea_bottle: (
      <group {...props}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder011.geometry} material={materials.grind_base} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder011_1.geometry} material={materials.tea_marker} />
      </group>
    ),
  }
  return (
    <group ref={ref} visible={visible}>
      {items[name]}
    </group>
  )
})

useGLTF.preload('/models/items.glb')

export default Items
