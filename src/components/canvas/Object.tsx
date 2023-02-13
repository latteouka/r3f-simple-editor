import * as THREE from 'three'
import { useRef, useEffect, Suspense, useState } from 'react'

import { useControls } from './MultiLeva'

import { useDrag } from '@use-gesture/react'
import { animated, useSpring } from '@react-spring/three'
import Sprite from './Sprite'
import { TextureLoader } from 'three'
import { button, folder } from 'leva'
import { useDispatch } from 'react-redux'
import { deleteObject } from '@/utils/features/statusSlice'
import { useThree } from '@react-three/fiber'
import { useSelectedStore } from '@/utils/zustand'

// transform mode
type Mode = ['translate', 'rotate', 'scale']
export const modes: Mode = ['translate', 'rotate', 'scale']

// reuse geometry
const box = new THREE.BoxGeometry(0.3, 0.3, 0.3)
const sphere = new THREE.SphereGeometry(0.2, 32, 32)

const raycaster = new THREE.Raycaster()
const dummy = new THREE.Vector3()

const textureLoader = new TextureLoader()

// calculate the min height of a threejs mesh
const box3 = new THREE.Box3()

const calculateHeight = (mesh: THREE.Mesh) => {
  box3.setFromObject(mesh, true)
  const height = Math.min(box3.max.x - box3.min.x, box3.max.y - box3.min.y, box3.max.z - box3.min.z)
  return height
}

// const material = new THREE.MeshPhongMaterial({ color: 'hotpink', side: THREE.DoubleSide, transparent: true })
// const offset = new THREE.Vector3(0, 0.25, 0)

export default function ({ position, quaternion, geometry, name, color = 'white', setIsDragging, grp }) {
  // refs
  const group = useRef<THREE.Group>(null)
  const ref = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.MeshPhongMaterial>(null)

  const [height, setHeight] = useState(0)

  const { mouse, camera } = useThree()

  // const objects = useSelector((state: RootState) => state.status.objects)
  const dispatch = useDispatch()

  // const selected = useSelect().map((sel) => sel.userData.store)

  const { selected, setSelected } = useSelectedStore()

  const selectedStores = selected.map((sel) => sel.userData.store)

  const [store, allProps, set]: any = useControls(selectedStores, {
    Position: folder({
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
    }),
    Rotation: folder({
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
    }),
    scale: {
      value: 1,
      min: 0.01,
      max: 3,
      step: 0.01,
    },
    color: {
      value: color,
    },
    textureMap: {
      image: undefined,
    },
    Delete: button(() => {
      dispatch(deleteObject(name))
      setSelected([])
    }),
  })

  const isSelected = !!selectedStores.find((sel) => sel === store)
  console.log(isSelected)

  // spring is for useDrag's moving implementation
  // using leva api to mutate position so don't have to bind spring to mesh
  const [, api]: any = useSpring(() => ({
    position: [allProps.px, allProps.py, allProps.pz],
    config: { friction: 10 },
  }))

  const bind: any = useDrag<THREE.Event>(
    ({ active, timeStamp }) => {
      if (active && isSelected) {
        raycaster.setFromCamera(mouse, camera)

        if (!grp) return
        const result = raycaster.intersectObject(grp, true)

        if (result.length > 0) {
          const newPosition = dummy.copy(result[0].point).addScaledVector(result[0].face.normal, height / 2 + 0.001)
          set({ px: newPosition.x, py: newPosition.y, pz: newPosition.z })
        }
      }

      material.current.opacity = active ? 0.6 : 1
      setIsDragging(active)

      api.start({
        position: [allProps.px, allProps.py, allProps.pz],
      })
      return timeStamp
    },
    { delay: true },
  )

  // set initial rotation for once
  useEffect(() => {
    ref.current.quaternion.copy(new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w))
  }, [])

  // calculate height
  useEffect(() => {
    const height = calculateHeight(ref.current)
    setHeight(height)
  }, [allProps.scale])

  // if user upload texture change
  useEffect(() => {
    // clear when press x
    if (!allProps.textureMap) {
      material.current.map = null
      return
    }

    textureLoader.load(allProps.textureMap, (t) => {
      material.current.map = t
      material.current.needsUpdate = true
    })
  }, [allProps.textureMap])

  // // why not rotate the ball!
  // useFrame((state) => {
  //   if (ref.current.geometry.type === 'SphereGeometry') {
  //     ref.current.rotation.x += Math.sin(state.clock.elapsedTime) / 50
  //   }
  // })

  return (
    <group ref={group}>
      <animated.mesh
        {...bind()}
        castShadow
        receiveShadow
        position={[allProps.px, allProps.py, allProps.pz]}
        rotation={[allProps.rx, allProps.ry, allProps.rz]}
        scale={allProps.scale}
        ref={ref}
        name={name}
        userData={{ store }}
        geometry={geometry === 'box' ? box : sphere}>
        <meshPhongMaterial color={allProps.color} map={null} ref={material} transparent />
      </animated.mesh>
      <Suspense fallback={null}>
        <Sprite
          position={new THREE.Vector3(allProps.px, allProps.py, allProps.pz)}
          isSelected={isSelected}
          parent={ref}
        />
      </Suspense>
    </group>
  )
}
