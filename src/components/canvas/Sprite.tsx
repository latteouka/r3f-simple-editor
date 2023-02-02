import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

const offset = new THREE.Vector3(0, 0.25, 0)

export default function ({ position, isSelected }) {
  const texture = useTexture('/icons/down.png')
  const spriteRef = useRef<THREE.Sprite>(null)

  const spritePosition = position.clone().add(offset)

  useEffect(() => {
    spriteRef.current.position.copy(position.clone().add(offset))
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (isSelected) {
      spriteRef.current.position.y += Math.sin(t * 7) / 500
    }
  })

  return (
    <sprite ref={spriteRef} position={spritePosition} scale={0.2} visible={isSelected}>
      <spriteMaterial map={texture} />
    </sprite>
  )
}
