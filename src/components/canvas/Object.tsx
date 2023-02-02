import * as THREE from 'three'
import { useRef, Suspense, useEffect } from 'react'

import { useSelect } from '@react-three/drei'
import { useControls } from './MultiLeva'

import Sprite from './Sprite'
import { TextureLoader } from 'three'
import { button } from 'leva'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { deleteObject } from '@/utils/features/statusSlice'

// transform mode
type Mode = ['translate', 'rotate', 'scale']
export const modes: Mode = ['translate', 'rotate', 'scale']

// reuse geometry
const box = new THREE.BoxGeometry(0.3, 0.3, 0.3)
const sphere = new THREE.SphereGeometry(0.2, 32, 32)

//const material = new THREE.MeshPhongMaterial({ color: 'hotpink', side: THREE.DoubleSide, transparent: true })
const offset = new THREE.Vector3(0, 0.25, 0)

export default function ({ position, quaternion, geometry, name, color = 'white' }) {
  const group = useRef<THREE.Group>(null)
  const ref = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshPhongMaterial>(null)

  const objects = useSelector((state: RootState) => state.status.objects)
  const dispatch = useDispatch()

  const selected = useSelect().map((sel) => sel.userData.store)

  const [store, allProps]: any = useControls(selected, {
    px: {
      value: position.x,
      min: -5,
      max: 5,
      step: 0.01,
    },
    py: {
      value: position.y,
      min: -5,
      max: 5,
      step: 0.01,
    },
    pz: {
      value: position.z,
      min: -5,
      max: 5,
      step: 0.01,
    },
    rx: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
    ry: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
    rz: {
      value: 0,
      min: -5,
      max: 5,
      step: 0.01,
    },
    color: {
      value: color,
    },
    texture: {
      image: undefined,
    },
    Delete: button(() => {
      dispatch(deleteObject(name))
    }),
  })

  const isSelected = !!selected.find((sel) => sel === store)

  // set initial rotation
  useEffect(() => {
    ref.current.quaternion.copy(new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w))
  }, [])

  // change texture
  useEffect(() => {
    if (!allProps.texture) return

    const textureLoader = new TextureLoader()
    textureLoader.load(allProps.texture, (t) => {
      material.current.map = t
      material.current.needsUpdate = true
    })
  }, [allProps.texture])

  return (
    <group ref={group}>
      <mesh
        castShadow
        receiveShadow
        position={[allProps.px, allProps.py, allProps.pz]}
        rotation={[allProps.rx, allProps.ry, allProps.rz]}
        // quaternion={quaternion}
        ref={ref}
        name={name}
        userData={{ store }}
        // onClick={(e) => (e.stopPropagation(), dispatch(setSelected(ref.current)))}
        // onPointerMissed={(e) => e.type === 'click' && dispatch(setSelected(null))}
        geometry={geometry === 'box' ? box : sphere}>
        <meshPhongMaterial color={allProps.color} map={null} ref={material} />
      </mesh>
      <Suspense>{ref.current && <Sprite position={ref.current.position} isSelected={isSelected} />}</Suspense>
      {/* <sprite ref={spriteRef} position={spritePosition} scale={0.2} visible={isSelected}> */}
      {/*   <spriteMaterial map={texture} /> */}
      {/* </sprite> */}
    </group>
  )
}
