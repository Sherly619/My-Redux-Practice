import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { EventType } from "../AddPostForm";
import { postUpdated, selectPostById } from "../postsSlice";

import './index.scss';

export const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state: RootState) => selectPostById(state, postId as string));

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);

    const dispatch = useDispatch();
    
    if (!postId) return (<></>);
    
    const onTitleChange = (e: EventType) => setTitle(e.target.value);
    const onContentChange = (e: EventType) => setContent(e.target.value);

    const onSavePostClick = () => {
        if(title?.trim() && content?.trim()) {
            dispatch(postUpdated(postId, title, content));
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
                <button type="button" onClick={onSavePostClick}>Save Post</button>
            </form>
        </section>
    )
}