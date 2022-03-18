import { nanoid } from "@reduxjs/toolkit";
import { PostState, PostsState, InitItem, Reactions } from "../features/posts/postsSlice";

export const reactions: Reactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
};

export interface Notification {
  id: string;
  date: string;
  user: string;
  content: string;
  action: '1' | '2' | '3';
};

export type Notifications = Array<Notification>;

type GetString = 'GET_USERS' | 'GET_POSTS';

export type UserState = {
  id: string;
  name: string;
}

export type UsersState = UserState[];

const posts = [
  { id: '1', date: new Date().toISOString(), title: 'First Post!', content: 'Hello!', user: '1', reactions: Object.assign({}, reactions) },
  { id: '2', date: new Date().toISOString(), title: 'Second Post!', content: 'More text!', user: '2', reactions: Object.assign({}, reactions) },
  { id: '3', date: new Date().toISOString(), title: '欢迎来到Post大家庭!', content: '迫不及待地发下一条post吧!', user: '0', reactions: Object.assign({}, reactions) },      
];

const notifications: Notifications = [
  { id: '1', date: new Date().toISOString(), user: '2', content: 'says hi', action: '1' },
  { id: '2', date: new Date().toISOString(), user: '0', content: 'Glad to be friend!', action: '2' }
];

const users: UsersState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Lucy Jane' },
];

export const clientApi = {
  get(str: GetString) {
    if (str === 'GET_POSTS') {
      return new Promise<{ data: PostsState }>((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: posts });
        }, 1000);
      });
    }
    else {
      return new Promise<{ data: UsersState }>((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: users });
        }, 1000);
      });
    }
  },

  post(str: string, item: InitItem) {
    const newItem = {
      id: nanoid(),
      date: new Date().toISOString(),
      ...item,
      reactions: Object.assign({}, reactions)
    }
    posts.push(newItem);
    
    return new Promise<{ data: PostState }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: newItem});
      }, 1000);
    })
  },

  notice(str: string) {
    return new Promise<{ data: Notifications }>(resolve => {
      setTimeout(() => {
        // if (new Date().toISOString().localeCompare(notifications[0].date)) return;
        resolve({ data: notifications});
      }, 1000);
    })
  }
};