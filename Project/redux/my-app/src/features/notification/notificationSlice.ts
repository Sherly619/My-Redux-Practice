import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientApi, Notification, Notifications } from "../../api/client";
import { RootState } from "../../app/store";

export const fetchNotifications = createAsyncThunk<Notifications>('notification/fetchNotifications', async () => {
  const response = await clientApi.notice('fakeApi/fetch');
  return response.data;
});

type NotificationStatus = 'pending' | 'fulfilled' | 'failed';
type NotificationMsg = string | undefined;

const notificationAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = notificationAdapter.getInitialState({
  status: 'pending' as NotificationStatus,
  msg: 'loading...' as NotificationMsg
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {

  },
  extraReducers(build) {
    build
      .addCase(fetchNotifications.pending, (state, _action) => {
        state.status = 'pending';
        state.msg = 'loading...'
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notifications>) => {
        state.status = 'fulfilled';
        notificationAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.msg = action.error.message;
      })
  }
});

export default notificationSlice.reducer;

export const selectNotificationStatus = (state: RootState) => state.notification.status;

export const selectNotificationMsg = (state: RootState) => state.notification.msg;

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById
} = notificationAdapter.getSelectors((state: RootState) => state.notification);