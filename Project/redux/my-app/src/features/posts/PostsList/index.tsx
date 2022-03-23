import * as React from "react";
import { Link } from "react-router-dom";
import { PostAuthor } from "../../users/PostAuthor";
import { TimeAgo } from "../TimeAgo";
import { ReactionButtons } from "../ReactionButtons";
import { Spinner } from "../../../app/Spinner";
import { useGetPostsQuery } from "../../api/apiSlice";

import './index.scss';

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  const getPostList = () => {
    if (isLoading) {
      return (
        <Spinner text="Loading..." />
      );
    } else if (isSuccess) {
      const orderedPosts = posts!.slice().sort((a, b) => b.date.localeCompare(a.date));
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
    } else if (isError) {
      return (
        <div>{error}</div>
      )
    }
  };

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {getPostList()}
    </section>
  )
}

