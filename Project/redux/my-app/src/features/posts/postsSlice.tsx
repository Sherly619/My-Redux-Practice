import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type PostsState = Array<{
    id: string;
    title: string;
    content: string;
}>;

export const initialState: PostsState = [
    {id: '1', title: 'First Post!', content: 'Hello!'},
    {id: '2', title: 'Second Post!', content: 'More text!'},
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    }
});

export default postsSlice.reducer;
