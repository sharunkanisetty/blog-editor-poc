import React from 'react';

export default function BlogList({ blogs, onEdit }) {
  return (
    <div>
      <h3>Drafts</h3>
      {blogs.filter(b => b.status === 'draft').length === 0 && <p>No drafts.</p>}
      {blogs
        .filter((blog) => blog.status === 'draft')
        .map((blog) => (
          <div
            key={blog.id}
            style={{ border: '1px solid gray', padding: 10, marginBottom: 10, cursor: 'pointer' }}
            onClick={() => onEdit(blog.id)}
          >
            <h4>{blog.title || '(Untitled Draft)'}</h4>
            <small>Last updated: {new Date(blog.updated_at).toLocaleString()}</small>
          </div>
        ))}

      <h3>Published Blogs</h3>
      {blogs.filter(b => b.status === 'published').length === 0 && <p>No published blogs.</p>}
      {blogs
        .filter((blog) => blog.status === 'published')
        .map((blog) => (
          <div
            key={blog.id}
            style={{ border: '1px solid green', padding: 10, marginBottom: 10, cursor: 'pointer' }}
            onClick={() => onEdit(blog.id)}
          >
            <h4>{blog.title}</h4>
            <small>Published: {new Date(blog.updated_at).toLocaleString()}</small>
          </div>
        ))}
    </div>
  );
}
