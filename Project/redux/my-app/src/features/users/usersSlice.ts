import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { clientApi, UsersState, UserState } from "../../api/client";
import { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await clientApi.get('GET_USERS');
    return response.data as UsersState;
})

const userAdapter = createEntityAdapter<UserState>();

const initialState = userAdapter.getInitialState()

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    },
    extraReducers(build) {
        build.addCase(fetchUsers.fulfilled, userAdapter.setAll)
    }
});

export default usersSlice.reducer;

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectAllIds
} = userAdapter.getSelectors((state: RootState) => state.users);