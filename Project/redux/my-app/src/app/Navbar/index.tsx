import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotifications } from "../../features/notification/notificationSlice";

import './index.scss';

export const Navbar = () => {
    const dispatch = useDispatch();
    const fetchNewNotifications = () => {
        dispatch(fetchNotifications());
    };
    
    return (
        <section className="navbar">
            <h1>Redux Essentials Example</h1>
            <div className="nav-info">
                <Link className="nav-child post-link" to="">Posts</Link>
                <Link className="nav-child users-link" to="users">Users</Link>
                <Link className="nav-child notifications-link" to="notification">Notifications</Link>
                <div className="Refresh-button">
                    <button onClick={fetchNewNotifications}>Refresh Notifications</button>
                </div>
            </div>
        </section>
    )
}