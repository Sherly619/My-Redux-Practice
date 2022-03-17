import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

import './index.scss';

export const TimeAgo = ({ timestamp }: { timestamp: string }) => {
    const timeago = timestamp? ' ' + formatDistanceToNow(parseISO(timestamp)) + ' ago' : 'unknown time';

    return (
        <i className="time-ago">{timeago}</i>
    )
}