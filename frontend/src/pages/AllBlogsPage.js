import React, { useEffect, useState } from 'react';
import { getAllBlogs, deleteBlog } from '../services/api';

export default function AllBlogsPage({ onEdit, onView, filter, isLoggedIn }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs(filter);
  }, [filter]);

  const fetchBlogs = async (status) => {
    try {
      const res = await getAllBlogs(status);
      setBlogs(res.data);
    } catch (err) {
      alert('Failed to load blogs');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs(filter);
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20,marginLeft:300,marginRight:300  }}>
      <h2 style={{ color: '#333', fontSize: '2rem', marginBottom: 15 }}>
        {filter === 'draft' ? 'Drafts' : 'Published Blogs'}
      </h2>

      {blogs.length === 0 ? (
        <p style={{ color: '#666' }}>
          {filter === 'draft' ? 'No drafts found' : 'No published blogs found'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {blogs.map((b) => (
            <li
              key={b.id}
              style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              <span
                style={{
                  cursor: 'pointer',
                  color: '#007bff',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  userSelect: 'none',
                }}
                onClick={() => (filter === 'draft' ? onEdit(b.id) : onView(b.id))}
              >
                {b.title || 'Untitled'}
              </span>
              <p style={{ color: '#555', margin: 0 }}>
                {b.content
                  ? b.content.split(' ').slice(0, 25).join(' ') +
                    (b.content.split(' ').length > 25 ? '...' : '')
                  : ''}
              </p>

              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => handleDelete(b.id)}
                    style={{
                      padding: '5px 10px',
                      cursor: 'pointer',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: 3,
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  Please login to manage blogs
                </p>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '20px 0' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
