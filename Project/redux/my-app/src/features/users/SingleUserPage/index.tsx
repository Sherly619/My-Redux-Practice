import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { selectPostsByUser } from "../../posts/postsSlice";
import { selectUserById } from "../usersSlice";

import './index.scss';

export const SingleUserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state: RootState) => selectUserById(state, userId as string));
  const userPost = useSelector((state: RootState) => selectPostsByUser(state, userId as string));

  if (!user) {
    alert('用户不存在');
    return (
      <></>
    );
  }
  const renderUserPosts = () => {
    if (!userPost) return <></>;
    return (userPost.map(post => (
      <li key={post.id}>
        <Link className="user-post-link" to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )))
  }
  return (
    <section className="single-user">
      <h2>{user.name}</h2>
      {renderUserPosts()}
    </section>
  )
};