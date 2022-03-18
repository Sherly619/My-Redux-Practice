import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { selectUserById } from "../usersSlice";

import './index.scss';

export const PostAuthor = ({ userId }: { userId: string }) => {
    const author = useSelector((state: RootState) => selectUserById(state, userId));

    return (
        <span className="post-author-info">by {author ? author.name : 'unknown author'}</span>
    );
};