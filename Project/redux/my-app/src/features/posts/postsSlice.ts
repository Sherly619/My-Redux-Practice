import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export interface EditPost {
  id: string;
  title: string;
  content: string;
}

export interface PostState {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: Reactions;
};

export type PostsState = Array<PostState>;

export type postStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type error = string | null;

const postsAdapter = createEntityAdapter<PostState>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

export const initialState = postsAdapter.getInitialState({
  status: 'idle' as postStatus,
  error: null as error
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await clientApi.get('GET_POSTS');
  return response.data as PostsState;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: InitItem) => {
  const response = await clientApi.post('/fakeApi/posts', initialPost);
  return response.data;
});

type UpdatedPayload = {
  id: string;
  title: string;
  content: string
};

type ReactionAddedPayload = {
  id: string;
  reaction: ReactionsType;
}

// 处理posts的reducer，通过createSlice创建
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: {
      reducer(state, action: PayloadAction<UpdatedPayload>) {
        const { id, title, content } = action.payload;
        const existingPost = state.entities[id];
        if (existingPost) {
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
      reducer(state, action: PayloadAction<ReactionAddedPayload>) {
        const { id, reaction } = action.payload;
        const existingPost = state.entities[id];
        if (existingPost) {
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
      .addCase(fetchPosts.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsState>) => {
        state.status = 'succeeded';
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message) as string;
      })
      .addCase(addNewPost.fulfilled, (state, action: PayloadAction<PostState>) => {
        postsAdapter.addOne(state, action.payload);
      })
  }
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectPostStatus = (state: RootState) => state.posts.status;

export const selectPostError = (state: RootState) => state.posts.error;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_state: RootState, userId: string) => userId],
  (posts: PostsState, userId: string) => posts.filter(post => post.user === userId)
);

