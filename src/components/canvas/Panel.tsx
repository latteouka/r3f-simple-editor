import { LevaPanel } from 'leva'

export default function ({ selected }) {
  const store = selected?.userData.store
  return <LevaPanel store={store} />
}
