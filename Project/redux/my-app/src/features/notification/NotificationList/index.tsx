import { formatDistanceToNow, parseISO } from 'date-fns';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../../users/usersSlice';
import { fetchNotifications, selectAllNotifications } from '../notificationSlice';

import './index.scss';

const actions = {
  '1': 'says hi',
  '2': 'is glad to be friend',
  '3': 'says welcome'
}

export function NotificationList () {
  const dispatch = useDispatch()
  
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  useEffect(() => {
    if (notifications.status === 'pending') {
      dispatch(fetchNotifications());
    }
  }, [notifications.status, dispatch]);

  const renderNotice = () => {
    if (notifications.status !== 'fulfilled') return <>{notifications.msg}</>;
    return notifications.data.map(notification => {
      const date = parseISO(notification.date);
      const timeAgo = formatDistanceToNow(date);
      const currentUser = users.find(user => user.id === notification.user);
      if (!currentUser) return <></>;
      return (
        <div key={notification.id}>
          <div>
            <b>{currentUser.name} </b>{actions[notification.action]}
          </div>
          <div>{notification.content}</div>
          <div>{timeAgo}</div>
        </div>
      )
    })
  }

  return (
    <div className='notification'>
      <h2>Notifications</h2>
      {renderNotice()}
    </div>
  );
}
