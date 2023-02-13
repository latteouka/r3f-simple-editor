import { RootState } from '@/utils/store'
import { TransformControls, useSelect } from '@react-three/drei'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '@/utils/features/statusSlice'

type Mode = ['translate', 'rotate', 'scale']
export const modes: Mode = ['translate', 'rotate', 'scale']

export default function Controls({ target }) {
  // const selected = useSelect()
  // const mode = useSelector((state: RootState) => state.status.mode)
  // const dispatch = useDispatch()
  //
  // const handleRightClick = () => {
  //   if (!selected) return
  //   dispatch(setMode())
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('contextmenu', handleRightClick)
  //
  //   return () => {
  //     window.removeEventListener('contextmenu', handleRightClick)
  //   }
  // }, [mode, selected])
  return (
    <>
      {target.length > 0 && <TransformControls object={target[0]} mode='scale' />}
      {/* <OrbitControls makeDefault /> */}
    </>
  )
}
