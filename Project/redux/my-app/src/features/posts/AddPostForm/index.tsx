import * as React from 'react';
import { useState, ChangeEvent } from "react";
import {  useSelector } from "react-redux";
import { useAddPostMutation } from '../../api/apiSlice';
import { selectAllUsers } from "../../users/usersSlice";

import './index.scss';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const [addPostMutation, { isLoading }] = useAddPostMutation();

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onAuthorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClick = async () => {
    if(canSave) {
      try {
        await addPostMutation({ title, content, user: userId })
        setTitle('');
        setContent('');
        setUserId('');
      } catch(err) {
        console.log(err);
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