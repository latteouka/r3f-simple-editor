import { Canvas } from '@react-three/fiber'
import { KeyboardControls, KeyboardControlsEntry, Preload, Select } from '@react-three/drei'
import { Panel } from './MultiLeva'
import { Suspense, useMemo, useState, useRef } from 'react'
import AddObject from './AddObject'
import Floor from './Floor'
import Model from './Model'
import Light from './Light'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'

export enum KeyControls {
  add = 'add',
}

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  //const selected = useSelector((state: RootState) => state.status.selected)
  const [selected, setSelected] = useState([])

  const indicatorTarget = useRef<THREE.Group>(null)

  const map = useMemo<KeyboardControlsEntry<KeyControls>[]>(() => [{ name: KeyControls.add, keys: ['a', 'A'] }], [])

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas
          {...props}
          camera={{ fov: 50, position: [6, 6, 6] }}
          shadows
          onCreated={({ gl }) => {
            gl.setClearColor(0xfef3e3)
          }}>
          <Light />
          <Suspense fallback={null}>
            <Floor />
            <group ref={indicatorTarget}>
              <Model position={[0, 0, 0]} />
            </group>
          </Suspense>
          <AddObject
            grp={indicatorTarget}
            offset={0.001}
            selectedProps={{ selected: selected, setSelected: setSelected }}
          />
          {children}
          <Preload all />
          <Perf position='top-left' />
        </Canvas>

        <Leva />
        <Panel selected={selected} />
      </KeyboardControls>
    </>
  )
}
