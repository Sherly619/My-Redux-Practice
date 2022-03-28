import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { UsersState, UserState } from "../../api/client";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter<UserState>();

const initialState = userAdapter.getInitialState();
export type UserEntity = typeof initialState;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UserEntity, void>({
      query: () => '/getUsers',
      transformResponse: (responseData: UsersState) => {
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ['User']
    })
  })
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

export const selectAllUsersData = createSelector(
  [selectUsersResult],
  usersResult => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectAllIds
} = userAdapter.getSelectors((state: RootState) => selectAllUsersData({ state: state.api }) || initialState);