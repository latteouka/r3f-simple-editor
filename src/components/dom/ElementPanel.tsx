import { useSelector, useDispatch } from 'react-redux'
import { setAdd, resetObject, popLastObject } from '@/utils/features/statusSlice'
import { RootState } from '@/utils/store'

export default function ElementPanel() {
  // current adding object type
  const add = useSelector((state: RootState) => state.status.add)
  const dispatch = useDispatch()

  return (
    <div className='absolute bottom-0 left-0 z-30 flex flex-col md:flex-row text-black'>
      <div className='bg-red-50 z-30 m-4 p-2 md:p-3 rounded-lg flex justify-start items-center gap-3'>
        <button
          className={`text-md md:text-2xl py-1 px-2 md:p-2 rounded-md hover:bg-red-200 ${
            add === 'box' ? 'bg-red-100' : 'bg-red-50'
          }`}
          onClick={() => dispatch(setAdd('box'))}>
          Box
        </button>
        <button
          className={`text-md md:text-2xl py-1 px-2 md:p-2 rounded-md hover:bg-red-200 ${
            add === 'sphere' ? 'bg-red-100' : 'bg-red-50'
          }`}
          onClick={() => dispatch(setAdd('sphere'))}>
          Sphere
        </button>
        <div className='w-[2px] h-[20px] md:h-[24px] bg-red-400'></div>
        <button
          className='text-md md:text-2xl py-1 px-2 md:p-2 rounded-md hover:bg-red-200'
          onClick={() => dispatch(resetObject())}>
          Reset
        </button>
        <button
          className='text-md md:text-2xl py-1 px-2 md:p-2 rounded-md hover:bg-red-200'
          onClick={() => dispatch(popLastObject())}>
          Last
        </button>
      </div>
      {/* <div className='flex flex-col justify-center items-start mb-4 ml-6 md:ml-0 md:mb-0'> */}
      {/*   <p>Press a/A to enter adding mode.</p> */}
      {/*   <p>Press Shift to select multiple objects.</p> */}
      {/* </div> */}
    </div>
  )
}
