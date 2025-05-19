import React from 'react';

export default function Header({
  onNewBlog,
  onShowSignup,
  onShowLogin,
  onSetFilter,
  setMode,
  loggedIn,    // ✅ use this consistently
  onLogout
}) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        marginLeft:300,
        marginRight:300,
        borderRadius:'5px'
      }}
    >
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onSetFilter('published');
          setMode('list');
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ height: '40px', objectFit: 'contain' }}
        />
      </div>

      <nav style={{ display: 'flex', gap: 20 }}>
        <button
          style={btnStyle}
          onClick={() => {
            onSetFilter('published');
            setMode('list');
          }}
        >
          Blogs
        </button>
        <button
          style={btnStyle}
          onClick={() => {
            onSetFilter('draft');
            setMode('list');
          }}
        >
          Drafts
        </button>

        {loggedIn ? (
          <>
            <button style={btnStyle} onClick={onNewBlog}>
              Create Blog
            </button>
            <button style={btnStyle} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button style={btnStyle} onClick={onShowSignup}>
              Signup
            </button>
            <button style={btnStyle} onClick={onShowLogin}>
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

const btnStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold'
};
