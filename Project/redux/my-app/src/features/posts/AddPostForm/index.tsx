import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

import { addNewPost } from "../postsSlice";

import './index.scss';

export type EventType = {
  target: {
      value: string;
  }
};

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [canSave, setCanSave] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const onTitleChange = (e: EventType) => {
    setTitle(e.target.value);
  }
  const onContentChange = (e: EventType) => {
    setContent(e.target.value);
  }
  const onAuthorChange = (e: EventType) => {
    setUserId(e.target.value);
  }

  useEffect(() => {
    setCanSave([title.trim(), content.trim(), userId].every(Boolean) && !addRequestStatus);
  }, [title, content, userId, addRequestStatus]);

  const onSavePostClick = () => {
    if(canSave) {
      // 通过dispatch保存状态
      try {
        dispatch(addNewPost({ title, content, user: userId })); 
        setTitle('');
        setContent('');
        setUserId('');
        setAddRequestStatus(true);
      } catch (err) {
        console.log(err);
      } finally {
        setAddRequestStatus(false);
      }
    }
  };

  return (
    <section className="add-post-form">
      <h2>Add a New Post</h2>
      <form>
        <div className="post-div post-title">
          <label htmlFor="postTitle">Post Title:</label>
          <input className="input" type="text" id="postTitle" value={title} onChange={onTitleChange} />
        </div>
        <div className="post-div post-author">
          <label htmlFor="postAuthor">Author:</label>
          <select className="input" id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value=""></option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="post-div post-content">
          <label htmlFor="postContent">Content:</label>
          <textarea className="input" name="postContent" id="postContent" value={content} onChange={onContentChange} />
        </div>
        <button type="button" onClick={onSavePostClick} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}