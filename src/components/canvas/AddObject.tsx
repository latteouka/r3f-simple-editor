import * as THREE from 'three'
import { useState, useRef, useEffect, MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Select, useKeyboardControls } from '@react-three/drei'

import Object from './Object'
import { useDispatch, useSelector } from 'react-redux'
import { addObject } from '@/utils/features/statusSlice'
import { RootState } from '@/utils/store'

import { nanoid } from 'nanoid'
import Controls from './Controls'
import { useSelectedStore } from '@/utils/zustand'

interface RaycasterNormalProps {
  grp: MutableRefObject<THREE.Group>
  offset?: number
  //selectedProps: any
}
// this is the normal Normal!
const forwardVector = new THREE.Vector3(0, 0, 1)

const box3 = new THREE.Box3()
const raycaster = new THREE.Raycaster()

// calculate the min height of a threejs mesh
const calculateHeight = (mesh: THREE.Mesh) => {
  box3.setFromObject(mesh, true)
  const height = Math.min(box3.max.x - box3.min.x, box3.max.y - box3.min.y, box3.max.z - box3.min.z)
  return height
}

export default function RaycasterNormal({ grp, offset = 0.01 }: RaycasterNormalProps) {
  // for disable control
  const [isDragging, setIsDragging] = useState(false)
  // temp object visibility
  // const [visible, setVisible] = useState(false)
  // calculate add object height
  const [height, setHeight] = useState(0)

  // redux state
  const addGeometryType = useSelector((state: RootState) => state.status.add)
  const objects = useSelector((state: RootState) => state.status.objects)
  const dispatch = useDispatch()

  // state from parent, for passing selected to Leva Panel
  // const { selected, setSelected } = selectedProps
  const { selected, setSelected } = useSelectedStore()

  // ref
  const hitMesh = useRef<THREE.Mesh>(null)
  const tempObject = useRef<THREE.Mesh>(null)

  const aIsPressed = useKeyboardControls((state) => state.add)

  const { mouse, camera } = useThree()

  const handleClick = (event) => {
    if (!aIsPressed) return
    if (!grp.current) return
    raycaster.setFromCamera(mouse, camera)

    const result = raycaster.intersectObject(grp.current, true)

    if (result.length > 0) {
      dispatch(
        addObject({
          id: nanoid(),
          position: {
            x: tempObject.current.position.x,
            y: tempObject.current.position.y,
            z: tempObject.current.position.z,
          },
          quaternion: {
            x: tempObject.current.quaternion.x,
            y: tempObject.current.quaternion.y,
            z: tempObject.current.quaternion.z,
            w: tempObject.current.quaternion.w,
          },
          geometry: addGeometryType,
        }),
      )
    }
  }

  useFrame(({ mouse, camera }) => {
    raycaster.setFromCamera(mouse, camera)
    //raycaster.firstHitOnly = true

    if (!grp.current) return
    // const allObjects = grp.map((item) => item.current);
    const result = raycaster.intersectObject(grp.current, true)

    if (result.length > 0) {
      // add v * s (use normal vector to add some offset)
      hitMesh.current.position.copy(result[0].point).addScaledVector(result[0].face.normal, offset)
      tempObject.current.position.copy(result[0].point).addScaledVector(result[0].face.normal, height / 2 + offset)
      // rotate by normal
      hitMesh.current.quaternion.setFromUnitVectors(forwardVector, result[0].face.normal)
      tempObject.current.quaternion.setFromUnitVectors(forwardVector, result[0].face.normal)
    }
  })

  useEffect(() => {
    const height = calculateHeight(selected[0] ? selected[0] : tempObject.current)
    setHeight(height)
  }, [selected])

  // recalculate height when select
  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [aIsPressed, selected])

  return (
    <group>
      <mesh ref={hitMesh}>
        {/* testing more indicator */}
        {/* <boxGeometry args={[0.2, 0.2, 0.2]} /> */}
        {/* <sphereGeometry args={[0.2, 32, 32]} /> */}
        {/* <torusKnotGeometry args={[0.1, 0.04, 200, 50]} /> */}
        <ringGeometry args={[0.05, 0.1, 32]} />
        <meshBasicMaterial color='hotpink' side={THREE.DoubleSide} />
      </mesh>

      {/* show transparent temp object when a is pressed */}
      <mesh ref={tempObject} visible={aIsPressed}>
        {addGeometryType === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
        {addGeometryType === 'sphere' && <sphereGeometry args={[0.2, 32, 32]} />}
        <meshBasicMaterial color={0xff0000} side={THREE.DoubleSide} transparent opacity={aIsPressed ? 0.3 : 0} />
      </mesh>

      <Select multiple box onChange={setSelected}>
        {objects.map((object) => {
          return (
            <Object
              position={new THREE.Vector3(object.position.x, object.position.y, object.position.z)}
              quaternion={
                new THREE.Quaternion(object.quaternion.x, object.quaternion.y, object.quaternion.z, object.quaternion.w)
              }
              geometry={object.geometry}
              key={object.id}
              name={object.id}
              setIsDragging={setIsDragging}
              intersect={{ target: grp, height, offset }}
            />
          )
        })}
      </Select>

      {/* <Controls target={selected} /> */}
      <OrbitControls makeDefault enabled={!aIsPressed && !isDragging} />
    </group>
  )
}
