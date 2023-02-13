import * as THREE from 'three'
import { useState, useRef, useEffect, MutableRefObject, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, Select, useKeyboardControls } from '@react-three/drei'

import Object from './Object'
import { useDispatch, useSelector } from 'react-redux'
import { addObject } from '@/utils/features/statusSlice'
import { RootState } from '@/utils/store'

import { nanoid } from 'nanoid'
import { useSelectedStore } from '@/utils/zustand'
import Words from './Words'

interface RaycasterNormalProps {
  grp: MutableRefObject<THREE.Group>
  offset?: number
  //selectedProps: any
}
// this is the normal Normal!
const forwardVector = new THREE.Vector3(0, 0, 1)

const raycaster = new THREE.Raycaster()

const geometries = {
  box: <boxGeometry args={[0.3, 0.3, 0.3]} />,
  sphere: <sphereGeometry args={[0.2, 32, 32]} />,
}

const objectHeight = {
  box: 0.3,
  sphere: 0.4,
  blue_box: 0.14,
}

const offset = 0.01

export default function RaycasterNormal() {
  const { scene } = useThree()
  const [model, setModel] = useState<THREE.Object3D>()
  // for disable control
  const [isDragging, setIsDragging] = useState(false)
  // temp object visibility
  // const [visible, setVisible] = useState(false)
  // calculate add object height

  // redux state
  const addGeometryType = useSelector((state: RootState) => state.status.add)
  const objects = useSelector((state: RootState) => state.status.objects)
  const dispatch = useDispatch()

  // state from parent, for passing selected to Leva Panel
  // const { selected, setSelected } = selectedProps
  const { selected, setSelected } = useSelectedStore()

  // ref
  const tempObject = useRef<THREE.Mesh>(null)

  const aIsPressed = useKeyboardControls((state) => state.add)

  const { mouse, camera } = useThree()

  const handleClick = (event) => {
    if (!aIsPressed) return
    if (!model) return
    raycaster.setFromCamera(mouse, camera)

    const result = raycaster.intersectObject(model, true)

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

  const handleMouseMove = useCallback(() => {
    raycaster.setFromCamera(mouse, camera)

    if (!model) return
    const result = raycaster.intersectObject(model, true)

    if (result.length > 0) {
      // add v * s (use normal vector to add some offset)
      tempObject.current.position
        .copy(result[0].point)
        .addScaledVector(result[0].face.normal, objectHeight[addGeometryType] / 2 + offset)
      // rotate by normal
      console.log(result[0].face.normal)
      tempObject.current.quaternion.setFromUnitVectors(forwardVector, result[0].face.normal)
    }
  }, [addGeometryType, model])

  // recalculate height when select
  useEffect(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [aIsPressed, selected, addGeometryType, model])

  useEffect(() => {
    setModel(scene.getObjectByName('model'))
  }, [])

  return (
    <group>
      {/* show transparent temp object when a is pressed */}
      <mesh ref={tempObject} visible={aIsPressed}>
        {geometries[addGeometryType]}
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
              grp={model}
            />
          )
        })}
      </Select>

      {/* <Controls target={selected} /> */}
      <OrbitControls makeDefault enabled={!aIsPressed && !isDragging} />
    </group>
  )
}
