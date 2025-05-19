import React, { useState } from 'react';
import Header from './components/Header';
import AllBlogsPage from './pages/AllBlogsPage';
import EditorPage from './pages/EditorPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BlogView from './pages/BlogView'; // import BlogView

export default function App() {
  const [filter, setFilter] = useState('published'); // 'published' or 'draft'
  const [mode, setMode] = useState('list'); // 'list', 'edit', 'signup', 'login', 'view'
  const [editBlogId, setEditBlogId] = useState(null);
  const [viewBlogId, setViewBlogId] = useState(null); // new state for viewing blog
  const [loggedIn, setLoggedIn] = useState(false);

  const onNewBlog = () => {
    setEditBlogId(null);
    setMode('edit');
  };

  const onEdit = (id) => {
    setEditBlogId(id);
    setMode('edit');
  };

  const onView = (id) => {
    setViewBlogId(id);  // set blog ID to view
    setMode('view');    // switch mode to view
  };

  const onShowSignup = () => setMode('signup');
  const onShowLogin = () => setMode('login');

  const onSetFilter = (filter) => {
    setFilter(filter);
    setMode('list');
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setMode('list');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMode('list');
  };

  return (
    <>
      <Header
        onNewBlog={onNewBlog}
        onShowSignup={onShowSignup}
        onShowLogin={onShowLogin}
        onSetFilter={onSetFilter}
        setMode={setMode}
        loggedIn={loggedIn}
        onLogout={handleLogout}
      />

      {mode === 'list' && (
        <AllBlogsPage
          onEdit={onEdit}
          onView={onView}
          filter={filter}
          isLoggedIn={loggedIn}
        />
      )}

      {mode === 'edit' && (
        <EditorPage blogId={editBlogId} onBack={() => setMode('list')} />
      )}

      {mode === 'view' && (
        <BlogView blogId={viewBlogId} onBack={() => setMode('list')} />
      )}

      {mode === 'signup' && (
        <SignupPage onBack={() => setMode('list')} />
      )}

      {mode === 'login' && (
        <LoginPage
          onBack={() => setMode('list')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
