import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
export default function () {
  return (
    <>
      <Word rotation={[0, Math.PI / 2, 0]} position={[-2.65, 4.5, 2.7]}>
        Press a/A to enter adding mode.
      </Word>
      <Word rotation={[0, Math.PI / 2, 0]} position={[-2.65, 4.15, 2.7]}>
        Press Shift to select multiple objects.
      </Word>
      <Word rotation={[0, Math.PI / 2, 0]} position={[-2.65, 3.8, 2.7]}>
        Drag when item is selected.
      </Word>
    </>
  )
}

function Word({ children, ...props }) {
  const color = new THREE.Color()
  const ref = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)

  useFrame(() => {
    // Make text face the camera
    // ref.current.quaternion.copy(camera.quaterddnion)
    // Animate font color
    ref.current.material.color.lerp(color.set(hovered ? 'hotpink' : 'black'), 0.1)
  })

  return (
    <Text
      color='black'
      anchorX='left'
      anchorY='middle'
      fontSize={0.3}
      ref={ref}
      {...props}
      onPointerOver={over}
      onPointerOut={out}>
      {children}
    </Text>
  )
}
