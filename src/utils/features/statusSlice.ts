import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ObjectProps {
  id: string
  position: { x: number; y: number; z: number }
  quaternion: { x: number; y: number; z: number; w: number }
  geometry: 'box' | 'sphere' | 'blue_box'
}

export interface StatusState {
  mode: number
  add: 'box' | 'sphere' | 'blue_box'
  objects: ObjectProps[]
}

const initialState: StatusState = {
  mode: 0,
  add: 'box',
  objects: [],
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode += 1
    },
    setAdd: (state, action: PayloadAction<StatusState['add']>) => {
      state.add = action.payload
    },
    addObject: (state, action: PayloadAction<ObjectProps>) => {
      state.objects = [...state.objects, action.payload]
    },
    deleteObject: (state, action: PayloadAction<number>) => {
      const findObject = (item) => item.id === action.payload
      const index = state.objects.findIndex(findObject)
      const newObjects = [...state.objects]
      newObjects.splice(index, 1)
      state.objects = newObjects
    },
    popLastObject: (state) => {
      const newObjects = [...state.objects.slice(0, -1)]
      state.objects = newObjects
    },
    resetObject: (state) => {
      state.objects = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMode, setAdd, addObject, popLastObject, resetObject, deleteObject } = statusSlice.actions

export default statusSlice.reducer
