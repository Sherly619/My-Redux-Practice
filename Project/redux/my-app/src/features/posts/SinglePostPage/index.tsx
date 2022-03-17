import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { PostAuthor } from "../../users/PostAuthor";
import { selectPostById } from "../postsSlice";
import { TimeAgo } from "../TimeAgo";

import './index.scss';

export const SinglePostPage = () => {
    const { postId } = useParams();
    const post = useSelector((state: RootState) => selectPostById(state, postId as string));
    
    if(!post) {
        return (
            <h3>找不到该帖子!</h3>
        );
    }

    return (
        <section className="single-post-page">
            <h2>{post.title}</h2>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <div className="post-content">{post.content}</div>
            <button>
                <Link to={`/editPost/${post.id}`} >Edit Post</Link>
            </button>
        </section>
    );
};
