import React from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { ItemState, reactionAdded, Reactions, ReactionsType } from "../postsSlice";

import './index.scss';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '💗',
    rocket: '🚀',
    eyes: '👀'
};

export const ReactionButtons = ({ reactions, id }: ItemState) => {
    const dispatch = useDispatch();
    const onButtonClick = (name: ReactionsType) => {
        dispatch(reactionAdded(id, name));
    }

    return (
        <div className="reaction-buttons">
            {Object.entries(reactionEmoji).map(([emojiName, emoji]) => (
                <button key={emojiName} onClick={() => 
                    onButtonClick(emojiName as ReactionsType)}>{emoji} {reactions[emojiName as ReactionsType]}</button>
            ))}
        </div>
    )
}