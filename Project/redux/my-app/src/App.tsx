import React from 'react';
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import { PostsList } from './features/posts/PostsList';
import { Navbar } from './app/Navbar';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<PostsList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
