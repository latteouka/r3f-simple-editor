export const createStore = (init) => {
  console.log('create store')
  // hold date
  let store = null

  // interact with data
  const get = () => store
  const set = (operation) => (store) => operation(store)

  store = init(get, set)

  const useStore = () => {
    return store
  }
  return useStore
}
