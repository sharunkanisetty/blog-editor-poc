import React, { useState, useEffect, useRef } from 'react';
import { getBlogById, saveDraft, publishBlog } from '../services/api';

export default function EditorPage({ blogId, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (blogId) {
      getBlogById(blogId).then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [blogId]);

  // Auto-save every 5 seconds
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (title || content) handleAutoSave();
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [title, content]);

  const handleAutoSave = async () => {
    try {
      await saveDraft({ id: blogId, title, content });
      setMessage('Draft auto-saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Auto-save failed');
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraft({ id: blogId, title, content });
      setMessage('Draft saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    try {
      await publishBlog({ id: blogId, title, content, status: 'published' });
      alert('Blog published!');
      onBack();
    } catch (err) {
      alert('Failed to publish blog');
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>← Back</button>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter blog title"
        style={styles.input}
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your blog content here..."
        style={styles.textarea}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleSaveDraft} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
          Save Draft
        </button>
        <button onClick={handlePublish} style={{ ...styles.button, backgroundColor: '#28a745' }}>
          Publish
        </button>
      </div>

      <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 20,
    fontSize: '1.2rem',
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  textarea: {
    width: '100%',
    minHeight: 300,
    padding: 12,
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: 4,
    marginBottom: 20,
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    gap: 10,
  },
  button: {
    padding: '10px 16px',
    fontSize: '1rem',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
};
