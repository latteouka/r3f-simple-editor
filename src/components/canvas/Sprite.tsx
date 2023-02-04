import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

// move a little bit up offset
// const offsetBox = new THREE.Vector3(0, 0.25, 0)
// const offsetSphere = new THREE.Vector3(0, 0.3, 0)
const offset = new THREE.Vector3()

const box3 = new THREE.Box3()

// props' position is object's position
export default function ({ position, isSelected, geometry, parent }) {
  const texture = useTexture('/icons/down.png')
  const spriteRef = useRef<THREE.Sprite>(null)

  // position changing triggers re-render so useEffect will set the new position of sprite
  useEffect(() => {
    box3.setFromObject(parent.current, true)
    const height = Math.min(box3.max.x - box3.min.x, box3.max.y - box3.min.y, box3.max.z - box3.min.z)

    offset.set(0, height / 2 + 0.1, 0)
    spriteRef.current.position.copy(position.clone().add(offset))
  }, [position])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (isSelected) {
      spriteRef.current.position.y += Math.sin(t * 7) / 500
    }
  })

  return (
    <sprite ref={spriteRef} position={position} scale={0.2} visible={isSelected}>
      <spriteMaterial map={texture} />
    </sprite>
  )
}
