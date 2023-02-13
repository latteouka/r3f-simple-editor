import { Html } from '@react-three/drei'
import ElementPanel from '../dom/ElementPanel'

export default function Panel3D() {
  return (
    <mesh rotation={[0, Math.PI / 2, 0]} position={[-2.65, 3, 1.7]}>
      <planeGeometry args={[2.5, 1]} />
      <meshBasicMaterial color={0xffffff} />
      <Html>
        <div className='absolute bottom-0 left-0 z-30 flex flex-col md:flex-row text-black'>
          <div className='bg-red-50 z-30 m-4 p-2 md:p-3 rounded-lg flex justify-start items-center gap-3'>
            <button className={`text-md md:text-2xl py-1 px-2 md:p-2 rounded-md hover:bg-red-200`}>Box</button>
          </div>
        </div>
      </Html>
    </mesh>
  )
}
