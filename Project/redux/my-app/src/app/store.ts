import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleWare from 'redux-thunk'
import postsReducer from '../features/posts/postsSlice';
import notificationReducer from '../features/notification/notificationSlice';
import { apiSlice } from '../features/api/apiSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  posts: postsReducer,
  notification: notificationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [ apiSlice.middleware, thunkMiddleWare ]
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();