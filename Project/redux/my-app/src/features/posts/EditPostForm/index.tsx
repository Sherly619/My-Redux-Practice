import * as React from "react";
import { useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from "react-router";

import './index.scss';
import { useEditPostMutation, useGetPostQuery } from "../../api/apiSlice";

export const EditPostForm = () => {
  const { postId } = useParams();

  const {
    data: post,
  } = useGetPostQuery(postId!);

  const [editPostMutation, { isLoading }] = useEditPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  if (!postId) return (<></>);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const onSavePostClick = async () => {
    if (title?.trim() && content?.trim()) {
      await editPostMutation({ id: postId, title, content }).unwrap();
      navigate('/posts/' + postId);
    }
  };

  return (
    <section className="edit-post-form">
      <h2>Edit Post</h2>
      <form>
        <div className="post-div post-title">
          <label htmlFor="postTitle">Post Title:</label>
          <input type="text" id="postTitle" value={title} onChange={onTitleChange} />
        </div>
        <div className="post-div post-content">
          <label htmlFor="postContent">Content:</label>
          <textarea name="postContent" id="postContent" value={content} onChange={onContentChange} />
        </div>
        <button type="button" onClick={onSavePostClick} disabled={isLoading}>Save Post</button>
      </form>
    </section>
  )
}