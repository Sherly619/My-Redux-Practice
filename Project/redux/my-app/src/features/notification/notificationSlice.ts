import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientApi, Notifications } from "../../api/client";
import { RootState } from "../../app/store";

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async () => {
  const response = await clientApi.notice('fakeApi/fetch');
  return response.data;
});

interface NotificationState {
  status: 'pending' | 'fulfilled' | 'failed';
  msg: 'loading...' | 'error!';
  data: Notifications;
}

const initialState: NotificationState = {
  status: 'pending',
  msg: 'loading...',
  data: [] as Notifications
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {

  },
  extraReducers(build) {
    build
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = 'pending';
        state.msg = 'loading...'
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = state.data.concat(action.payload);
        state.data.sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.msg = 'error!';
      })
  }
});

export default notificationSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notification;