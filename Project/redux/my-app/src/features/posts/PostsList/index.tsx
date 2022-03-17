import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Link } from "react-router-dom";
import { PostAuthor } from "../../users/PostAuthor";
import { TimeAgo } from "../TimeAgo";
import { ReactionButtons } from "../ReactionButtons";
import { fetchPosts, postStatus, selectAllPosts } from "../postsSlice";
import { Spinner } from "../../../app/Spinner";

import './index.scss';

export const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = posts.status;
    const error = posts.error;

    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const orderedPosts = posts.items.slice().sort((a, b) => b.date.localeCompare(a.date));
    const getPostList = (status: postStatus) => {
        if(status === 'loading') {
            return (
                <Spinner text="Loading..." />
            );
        } else if(status === 'succeeded') {
            return orderedPosts.map(post => (
                <article className="post-excerpt" key={post.id}>
                    <h3>{post.title}</h3>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                    <p>{post.content.substring(0, 100)}</p>
                    <ReactionButtons {...post} />
                    <Link to={`/posts/${post.id}`}>View Post</Link>
                </article>
            ));
        }  else if(postStatus === 'failed') {
            return (
                <div>{error}</div>
            )
        }
    };

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {getPostList(postStatus)}
        </section>
    )
}

