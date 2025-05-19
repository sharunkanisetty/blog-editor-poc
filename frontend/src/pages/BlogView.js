import React, { useEffect, useState } from 'react';
import { getBlogById } from '../services/api';

export default function BlogView({ blogId, onBack }) {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (blogId) {
      getBlogById(blogId)
        .then((res) => setBlog(res.data))
        .catch(() => alert('Failed to load blog'));
    }
  }, [blogId]);

  if (!blog) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading...</p>;

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: 20,
        marginLeft: 300,
        marginRight: 300,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: 20,
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        ← Back to list
      </button>

      <h2 style={{ color: '#333', marginBottom: 10 }}>{blog.title || 'Untitled'}</h2>

      <p style={{ color: '#666', fontStyle: 'italic', marginTop: 0, marginBottom: 20 }}>
        <strong>Tags:</strong> {blog.tags || 'None'}
      </p>

      <div
        style={{
          whiteSpace: 'pre-wrap',
          border: '1px solid #ddd',
          padding: 15,
          borderRadius: 5,
          backgroundColor: '#f9f9f9',
          minHeight: 200,
          color: '#444',
          fontSize: '1rem',
          lineHeight: '1.5',
        }}
      >
        {blog.content}
      </div>
    </div>
  );
}
