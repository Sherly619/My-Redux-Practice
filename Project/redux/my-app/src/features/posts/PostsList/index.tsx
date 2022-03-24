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
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPostsQuery();
  console.log(posts,isLoading,isFetching)
  const orderedPosts = React.useMemo(() => {
    if (!posts) return posts;
    const postsCopy = [...posts];
    return postsCopy.sort((a, b) => b.date.localeCompare(a.date));
  }, [posts]);
  
  const getPostList = () => {
    if (isLoading) {
      return (
        <Spinner text="Loading..." />
      );
    } else if (isSuccess) {
      // const orderedPosts = posts!.slice().sort((a, b) => b.date.localeCompare(a.date));
      return orderedPosts!.map(post => (
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
      <button onClick={refetch} disabled={isFetching}>点击重新获取</button>
      {getPostList()}
    </section>
  )
}

