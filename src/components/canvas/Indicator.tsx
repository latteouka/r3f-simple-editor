import * as THREE from 'three'
import { useRef, useEffect, useCallback, useState } from 'react'
import { useThree } from '@react-three/fiber'

// this is the normal Normal!
const forwardVector = new THREE.Vector3(0, 0, 1)

const raycaster = new THREE.Raycaster()

export default function Indicator() {
  const [model, setModel] = useState<THREE.Object3D>()
  const { scene } = useThree()

  // ref
  const hitMesh = useRef<THREE.Mesh>(null)

  const { mouse, camera } = useThree()

  const handleMouseMove = useCallback(() => {
    if (!model) return
    raycaster.setFromCamera(mouse, camera)

    const result = raycaster.intersectObject(model, true)

    if (result.length > 0) {
      // add v * s (use normal vector to add some offset)
      hitMesh.current.position.copy(result[0].point).addScaledVector(result[0].face.normal, 0.01)
      hitMesh.current.quaternion.setFromUnitVectors(forwardVector, result[0].face.normal)
    }
  }, [model])

  // recalculate height when select
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [model])

  useEffect(() => {
    setModel(scene.getObjectByName('model'))
  }, [])

  return (
    <group>
      <mesh ref={hitMesh} rotation={[Math.PI / 2, 0, 0]}>
        {/* testing more indicator */}
        {/* <boxGeometry args={[0.2, 0.2, 0.2]} /> */}
        {/* <sphereGeometry args={[0.2, 32, 32]} /> */}
        {/* <torusKnotGeometry args={[0.1, 0.04, 200, 50]} /> */}
        <ringGeometry args={[0.05, 0.1, 32]} />
        <meshBasicMaterial color='hotpink' side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
