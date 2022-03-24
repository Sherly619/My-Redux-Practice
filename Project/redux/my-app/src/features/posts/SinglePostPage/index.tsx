import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Spinner } from "../../../app/Spinner";
import { useGetPostQuery } from "../../api/apiSlice";
import { PostAuthor } from "../../users/PostAuthor";
import { TimeAgo } from "../TimeAgo";

import './index.scss';

export const SinglePostPage = () => {
  const { postId } = useParams();

  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostQuery(postId!);

  const getPostDetail = () => {
    if (isFetching) {
      return (
        <Spinner text="Loading..." />
      )
    } else if (isSuccess) {
      if (post) {
        return (
          <>
            <h2>{post.title}</h2>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <div className="post-content">{post.content}</div>
            <button>
              <Link to={`/editPost/${post.id}`} >Edit Post</Link>
            </button>
          </> 
        )
      } else {
        return (
          <h3>找不到该帖子!</h3>
        );
      }
    } else if (isError) {
      return (
        <>{error}</>
      )
    } else return <></>
  }

  return (
    <section className="single-post-page">
      {getPostDetail()}
    </section>
  );
};
