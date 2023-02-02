import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './features/statusSlice'

export const store = configureStore({
  reducer: { status: statusReducer },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
