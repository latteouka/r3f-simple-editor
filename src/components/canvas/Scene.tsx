import { Canvas } from '@react-three/fiber'
import { KeyboardControls, KeyboardControlsEntry, Preload } from '@react-three/drei'
import { Panel } from './MultiLeva'
import { Suspense, useMemo, useRef } from 'react'
import AddObject from './AddObject'
import Floor from './Floor'
import Model from './Model'
import Light from './Light'
import { Perf } from 'r3f-perf'
import Test from './Test'
import Panel3D from './Panel3D'

export enum KeyControls {
  add = 'add',
  box = 'box',
  sphere = 'sphere',
}

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  //const selected = useSelector((state: RootState) => state.status.selected)
  //const [selected, setSelected] = useState([])
  //const setSelected = useSelectedStore((state) => state.setSelected)

  const indicatorTarget = useRef<THREE.Group>(null)

  const map = useMemo<KeyboardControlsEntry<KeyControls>[]>(
    () => [
      { name: KeyControls.add, keys: ['a', 'A'] },
      { name: KeyControls.box, keys: ['1'] },
      { name: KeyControls.sphere, keys: ['2'] },
    ],
    [],
  )

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas
          {...props}
          camera={{ fov: 35, position: [8, 13, 9], zoom: 0.9 }}
          shadows
          onCreated={({ gl }) => {
            gl.setClearColor(0xfef3e3)
          }}>
          <Light />
          <Suspense fallback={null}>
            <Floor position={[0, -1.01, 0]} />

            {/* mouse indicator ref */}
            <group ref={indicatorTarget}>
              <Model position={[0, -1, 0]} />
            </group>

            <AddObject
              grp={indicatorTarget}
              offset={0.001}
              // selectedProps={{ selected: selected, setSelected: setSelected }}
            />

            {children}
          </Suspense>

          <Preload all />
          {/* <Perf position='top-left' /> */}
        </Canvas>

        <Panel />
      </KeyboardControls>
    </>
  )
}
