import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostsList } from './features/posts/PostsList';
import { Navbar } from './app/Navbar';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { UserList } from './features/users/UserList';
import { SingleUserPage } from './features/users/SingleUserPage';
import { NotificationList } from './features/notification/NotificationList';

import './App.css';
import { useDispatch } from 'react-redux';
import { extendedApiSlice } from './features/users/usersSlice';

const App = () => {
  const dispatch = useDispatch()
  dispatch(extendedApiSlice.endpoints.getUsers.initiate())
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='' element={
            <React.Fragment>
              <AddPostForm />
              <PostsList />
          </ React.Fragment>
          } />
          <Route path='posts/:postId' element={<SinglePostPage />} />
          <Route path='editPost/:postId' element={<EditPostForm />} />
          <Route path='users' element={<UserList />} />
          <Route path='user/:userId' element={<SingleUserPage />} />
          <Route path='notification' element={<NotificationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
