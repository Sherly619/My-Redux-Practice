import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

const state = store.getState();
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = typeof state;