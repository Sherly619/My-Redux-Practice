import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

import './index.scss';

export const PostAuthor = ({ userId }: { userId: string }) => {
    const author = useSelector((state: RootState) => state.users.find(user => user.id === userId));

    return (
        <span className="post-author-info">by {author ? author.name : 'unknown author'}</span>
    );
};