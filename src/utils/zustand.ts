// redux don't like non-serializable things so use zustand instead
import { create } from 'zustand'

interface SelectedStore {
  selected: THREE.Mesh[]
  setSelected: (all: THREE.Mesh[]) => void
}

export const useSelectedStore = create<SelectedStore>()((set) => ({
  selected: [],
  setSelected: (all) => set(() => ({ selected: all })),
}))
