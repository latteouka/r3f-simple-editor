import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const grinderGlassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 0.9,
  roughness: 0.05,
  metalness: 0.05,
  color: 0xffffff,
  ior: 1.4,
  opacity: 0,
})

const cakeWindowMaterial = new THREE.MeshPhysicalMaterial({
  transparent: true,
  opacity: 1,
  transmission: 0.9,
  roughness: 0.35,
  metalness: 0.05,
  color: 0xeaffff,
  ior: 2,
})

export default function Model(props) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/models/lecouernew.glb') as unknown as GLTFResult
  // const { actions } = useAnimations(animations, group)
  useEffect(() => {
    group.current.name = 'model'
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        {/* <mesh */}
        {/*   name='cake_window' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.cake_window.geometry} */}
        {/*   material={cakeWindowMaterial} */}
        {/*   position={[2.36, 1.76, -1.68]} */}
        {/* /> */}
        <group name='pos' position={[1.32, 1.76, -0.09]}>
          <mesh
            name='Cube024'
            castShadow
            receiveShadow
            geometry={nodes.Cube024.geometry}
            material={materials.grind_metal}
          />
          <mesh
            name='Cube024_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube024_1.geometry}
            material={materials.pos2}
          />
        </group>
        <group name='counter' position={[0.52, 0.54, 0]}>
          <mesh
            name='Plane'
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials.counter_table}
          />
          <mesh
            name='Plane_1'
            castShadow
            receiveShadow
            geometry={nodes.Plane_1.geometry}
            material={materials.grind_metal}
          />
        </group>
        {/* <mesh */}
        {/*   name='white_box2' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.white_box2.geometry} */}
        {/*   material={materials.grind_metal} */}
        {/*   position={[-0.89, 3.81, -2.57]} */}
        {/* /> */}
        {/* <mesh */}
        {/*   name='white_box3' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.white_box3.geometry} */}
        {/*   material={materials.grind_metal} */}
        {/*   position={[-0.51, 3.81, -2.57]} */}
        {/* /> */}
        <mesh
          name='counter_floor'
          castShadow
          receiveShadow
          geometry={nodes.counter_floor.geometry}
          material={materials.counter_table}
          position={[-0.34, 0.38, -0.97]}
        />
        <group name='wall'>
          <mesh
            name='Plane010'
            castShadow
            receiveShadow
            geometry={nodes.Plane010.geometry}
            material={materials.grind_metal}
          />
          <mesh
            name='Plane010_1'
            castShadow
            receiveShadow
            geometry={nodes.Plane010_1.geometry}
            material={materials.counter_table}
          />
        </group>
        {/* <mesh */}
        {/*   name='white_box4' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.white_box4.geometry} */}
        {/*   material={materials.grind_metal} */}
        {/*   position={[-0.1, 3.81, -2.57]} */}
        {/* /> */}
        <mesh
          name='shelf2'
          castShadow
          receiveShadow
          geometry={nodes.shelf2.geometry}
          material={materials.card_stand}
          position={[-2.66, 4.3, -0.76]}
        />
        {/* <group name='vase' position={[2.42, 1.98, -0.47]}> */}
        {/*   <mesh */}
        {/*     name='Cube030' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube030.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube030_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube030_1.geometry} */}
        {/*     material={materials.leaf} */}
        {/*   /> */}
        {/* </group> */}
        {/* <group name='blue_box3' position={[0.53, 3.88, -2.46]}> */}
        {/*   <mesh */}
        {/*     name='Cube001' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube001.geometry} */}
        {/*     material={materials.box_body} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube001_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube001_1.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/* </group> */}
        <mesh
          name='shelf1'
          castShadow
          receiveShadow
          geometry={nodes.shelf1.geometry}
          material={materials.card_stand}
          position={[0.15, 3.75, -2.67]}
        />
        {/* <group name='blue_box4' position={[0.97, 3.88, -2.46]}> */}
        {/*   <mesh */}
        {/*     name='Cube005' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube005.geometry} */}
        {/*     material={materials.box_body} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube005_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube005_1.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/* </group> */}
        {/* <group name='blue_box5' position={[1.4, 3.88, -2.46]}> */}
        {/*   <mesh */}
        {/*     name='Cube006' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube006.geometry} */}
        {/*     material={materials.box_body} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube006_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube006_1.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/* </group> */}
        {/* <group name='blue_box1' position={[0.75, 4.1, -2.46]}> */}
        {/*   <mesh */}
        {/*     name='Cube007' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube007.geometry} */}
        {/*     material={materials.box_body} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube007_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube007_1.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/* </group> */}
        <mesh
          name='shelf3'
          castShadow
          receiveShadow
          geometry={nodes.shelf3.geometry}
          material={materials.card_stand}
          position={[-2.66, 3.2, -0.76]}
        />
        {/* <group name='tea_box1' position={[-2.44, 4.37, 0.06]}> */}
        {/*   <mesh */}
        {/*     name='Cube055' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube055.geometry} */}
        {/*     material={materials.grind_base} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube055_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube055_1.geometry} */}
        {/*     material={materials.tea_marker} */}
        {/*   /> */}
        {/* </group> */}
        {/* <group name='blue_box2' position={[1.17, 4.1, -2.46]}> */}
        {/*   <mesh */}
        {/*     name='Cube011' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube011.geometry} */}
        {/*     material={materials.box_body} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube011_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube011_1.geometry} */}
        {/*     material={materials.grind_metal} */}
        {/*   /> */}
        {/* </group> */}
        {/* <group name='tea_box2' position={[-2.44, 4.37, -0.41]}> */}
        {/*   <mesh */}
        {/*     name='Cube021' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube021.geometry} */}
        {/*     material={materials.grind_base} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cube021_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cube021_1.geometry} */}
        {/*     material={materials.tea_marker} */}
        {/*   /> */}
        {/* </group> */}
        <group name='coffee_machine' position={[0.07, 1.77, -0.33]}>
          <mesh
            name='Cube026'
            castShadow
            receiveShadow
            geometry={nodes.Cube026.geometry}
            material={materials.grind_metal}
          />
          <mesh
            name='Cube026_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube026_1.geometry}
            material={materials.grind_base}
          />
          <mesh
            name='Cube026_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube026_2.geometry}
            material={materials.coffee_metal}
          />
        </group>
        {/* <group name='tea_bottle2' position={[-2.44, 4.36, -1.53]}> */}
        {/*   <mesh */}
        {/*     name='Cylinder011' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cylinder011.geometry} */}
        {/*     material={materials.grind_base} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cylinder011_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cylinder011_1.geometry} */}
        {/*     material={materials.tea_marker} */}
        {/*   /> */}
        {/* </group> */}
        <group name='grinder_body' position={[-1.29, 1.88, 0.01]}>
          <mesh
            name='Circle012'
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials.grind_base}
          />
          <mesh
            name='Circle012_1'
            castShadow
            receiveShadow
            geometry={nodes.Circle012_1.geometry}
            material={materials.grind_metal}
          />
        </group>
        <mesh
          name='grinder_glass'
          castShadow
          receiveShadow
          geometry={nodes.grinder_glass.geometry}
          material={grinderGlassMaterial}
          position={[-1.29, 1.88, 0.01]}
        />
        {/* <group name='tea_bottle1' position={[-2.44, 4.36, -1.1]}> */}
        {/*   <mesh */}
        {/*     name='Cylinder001' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cylinder001.geometry} */}
        {/*     material={materials.grind_base} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Cylinder001_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Cylinder001_1.geometry} */}
        {/*     material={materials.tea_marker} */}
        {/*   /> */}
        {/* </group> */}
        {/* <mesh */}
        {/*   name='cup1' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.cup1.geometry} */}
        {/*   material={materials['Material.002']} */}
        {/*   position={[0.49, 2.47, -0.18]} */}
        {/* /> */}
        {/* <mesh */}
        {/*   name='cup2' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.cup2.geometry} */}
        {/*   material={materials['Material.002']} */}
        {/*   position={[0.11, 2.47, -0.28]} */}
        {/* /> */}
        <group name='card_stand' position={[2.42, 1.78, -0.01]}>
          <mesh
            name='Cube046'
            castShadow
            receiveShadow
            geometry={nodes.Cube046.geometry}
            material={materials.card_stand}
          />
          <mesh
            name='Cube046_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube046_1.geometry}
            material={materials.card}
          />
          <mesh
            name='Cube046_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube046_2.geometry}
            material={materials.card_none}
          />
        </group>
        {/* <mesh */}
        {/*   name='cup3' */}
        {/*   castShadow */}
        {/*   receiveShadow */}
        {/*   geometry={nodes.cup3.geometry} */}
        {/*   material={materials['Material.002']} */}
        {/*   position={[-0.26, 2.47, -0.22]} */}
        {/* /> */}
        {/* <group name='pearl' position={[2.33, 1.79, -1.7]}> */}
        {/*   <mesh */}
        {/*     name='Sphere008' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Sphere008.geometry} */}
        {/*     material={materials.caramelSolid} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Sphere008_1' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Sphere008_1.geometry} */}
        {/*     material={materials.base} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Sphere008_2' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Sphere008_2.geometry} */}
        {/*     material={materials.puff} */}
        {/*   /> */}
        {/*   <mesh */}
        {/*     name='Sphere008_3' */}
        {/*     castShadow */}
        {/*     receiveShadow */}
        {/*     geometry={nodes.Sphere008_3.geometry} */}
        {/*     material={materials.cream} */}
        {/*   /> */}
        {/* </group> */}
      </group>
    </group>
  )
}

type GLTFResult = GLTF & {
  nodes: {
    cake_window: THREE.Mesh
    Cube024: THREE.Mesh
    Cube024_1: THREE.Mesh
    Plane: THREE.Mesh
    Plane_1: THREE.Mesh
    white_box2: THREE.Mesh
    white_box3: THREE.Mesh
    counter_floor: THREE.Mesh
    Plane010: THREE.Mesh
    Plane010_1: THREE.Mesh
    white_box4: THREE.Mesh
    shelf1: THREE.Mesh
    Cube030: THREE.Mesh
    Cube030_1: THREE.Mesh
    shelf3: THREE.Mesh
    Cube001: THREE.Mesh
    Cube001_1: THREE.Mesh
    Cube005: THREE.Mesh
    Cube005_1: THREE.Mesh
    shelf2: THREE.Mesh
    Cube006: THREE.Mesh
    Cube006_1: THREE.Mesh
    Cube007: THREE.Mesh
    Cube007_1: THREE.Mesh
    Cube011: THREE.Mesh
    Cube011_1: THREE.Mesh
    Cube055: THREE.Mesh
    Cube055_1: THREE.Mesh
    Cube021: THREE.Mesh
    Cube021_1: THREE.Mesh
    Cube026: THREE.Mesh
    Cube026_1: THREE.Mesh
    Cube026_2: THREE.Mesh
    Cube046: THREE.Mesh
    Cube046_1: THREE.Mesh
    Cube046_2: THREE.Mesh
    Cylinder001: THREE.Mesh
    Cylinder001_1: THREE.Mesh
    Cylinder011: THREE.Mesh
    Cylinder011_1: THREE.Mesh
    Circle012: THREE.Mesh
    Circle012_1: THREE.Mesh
    grinder_glass: THREE.Mesh
    cup1: THREE.Mesh
    cup2: THREE.Mesh
    cup3: THREE.Mesh
    Sphere008: THREE.Mesh
    Sphere008_1: THREE.Mesh
    Sphere008_2: THREE.Mesh
    Sphere008_3: THREE.Mesh
  }
  materials: {
    cake_house: THREE.MeshStandardMaterial
    grind_metal: THREE.MeshStandardMaterial
    pos2: THREE.MeshStandardMaterial
    counter_table: THREE.MeshStandardMaterial
    card_stand: THREE.MeshStandardMaterial
    leaf: THREE.MeshStandardMaterial
    box_body: THREE.MeshStandardMaterial
    grind_base: THREE.MeshStandardMaterial
    tea_marker: THREE.MeshStandardMaterial
    coffee_metal: THREE.MeshStandardMaterial
    card: THREE.MeshStandardMaterial
    card_none: THREE.MeshStandardMaterial
    grind_glass: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    caramelSolid: THREE.MeshStandardMaterial
    base: THREE.MeshStandardMaterial
    puff: THREE.MeshStandardMaterial
    cream: THREE.MeshStandardMaterial
  }
}
