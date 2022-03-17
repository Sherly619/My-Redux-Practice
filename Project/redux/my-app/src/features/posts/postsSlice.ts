import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { clientApi } from "../../api/client";
import { RootState } from "../../app/store";

export interface Reactions {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
};

export type ReactionsType = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

export interface InitItem {
    title: string;
    content: string;
    user: string;
};

export interface ItemState {
    id: string;
    date: string;
    title: string;
    content: string;
    user: string;
    reactions: Reactions;
};

export type ItemsState = Array<ItemState>;

export type postStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type error = string | null;

export interface PostsState {
    items: ItemsState;
    status: postStatus;
    error: error
};

export const initialState: PostsState = {
    items: [],
    status: 'idle',
    error: null
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await clientApi.get('/fakeApi/posts');
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: InitItem) => {
    const response = await clientApi.post('/fakeApi/posts', initialPost);
    return response.data;
});

// 处理posts的reducer，通过createSlice创建
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postUpdated: {
            reducer(state, action) {
                const { id, title, content } = action.payload;
                const existingPost = state.items.find(post => post.id === id);
                if(existingPost) {
                    existingPost.date = new Date().toISOString();
                    existingPost.title = title;
                    existingPost.content = content;
                }
            },
            prepare(id: string, title: string, content: string) {
                return {
                    payload: {
                        id,
                        title,
                        content
                    },
                    meta: undefined,
                    error: ''
                }
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const { id, reaction }: { id: string, reaction: ReactionsType } = action.payload;
                const existingPost = state.items.find(post => post.id === id);
                if(existingPost) {
                    existingPost.reactions[reaction]++;
                }
            },
            prepare(id, reaction: ReactionsType) {
                return {
                    payload: {
                        id,
                        reaction
                    },
                    meta: undefined,
                    error: ''
                }
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.error.message) as string ;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
    }
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) => 
    state.posts.items.find(post => post.id === postId);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state: RootState, userId: string) => userId], 
    (posts: PostsState, userId: string) => posts.items.filter(post => post.user === userId)
);

