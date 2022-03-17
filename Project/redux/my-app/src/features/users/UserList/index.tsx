import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../../users/usersSlice";

import './index.scss';

export const UserList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <section className="user-list">
      <h2>用户列表</h2>
      {users.map(user => (
        <Link key={user.id} className="user-link" to={`/user/${user.id}`}>{user.name}</Link>
      ))}
    </section>
  );
};