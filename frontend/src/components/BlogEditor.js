import React, { useState, useEffect, useRef, useCallback } from 'react';
import { saveDraft, publishBlog, deleteBlog } from '../services/api';

export default function BlogEditor({ existingBlog, onSaved, onDeleted }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [id, setId] = useState(null);

  // Add this line to fix your errors:
  const [autoSaveMessage, setAutoSaveMessage] = useState('');

  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title || '');
      setContent(existingBlog.content || '');
      setTags(existingBlog.tags || '');
      setId(existingBlog.id || null);
    }
  }, [existingBlog]);

  const typingTimeoutRef = useRef(null);
  const autoSaveIntervalRef = useRef(null);

  const handleSaveDraft = useCallback(async () => {
    if (!title && !content) return;
    try {
      const response = await saveDraft({ id, title, content, tags });
      if (!id && response.data.id) setId(response.data.id);
      setAutoSaveMessage('Draft auto-saved');
      onSaved && onSaved();
      setTimeout(() => setAutoSaveMessage(''), 2000);
    } catch (err) {
      console.error('Failed to auto-save draft', err);
    }
  }, [id, title, content, tags, onSaved]);

  useEffect(() => {
    autoSaveIntervalRef.current = setInterval(() => {
      handleSaveDraft();
    }, 30000);
    return () => clearInterval(autoSaveIntervalRef.current);
  }, [handleSaveDraft]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      handleSaveDraft();
    }, 5000);
  };

  const handlePublish = async () => {
    if (!title || !content) {
      alert('Title and Content required to publish!');
      return;
    }

    try {
      let draftResponse;
      if (!id) {
        draftResponse = await saveDraft({ id, title, content, tags });
        if (draftResponse.data.id) setId(draftResponse.data.id);
      }
      await publishBlog({ id: id || draftResponse?.data?.id, title, content, tags });
      alert('Blog published!');
      onSaved && onSaved();
    } catch (err) {
      console.error('Publish failed', err);
      alert('Failed to publish');
    }
  };

  const handleDelete = async () => {
    if (!id) {
      alert('No blog to delete');
      return;
    }

    try {
      console.log('Attempting to delete blog with id:', id);
      const response = await deleteBlog(id);
      console.log('Delete response:', response.data);
      alert('Blog deleted!');
      onDeleted && onDeleted(id);
    } catch (err) {
      console.error('Delete failed:', err.response || err.message || err);
      alert('Failed to delete blog');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleChange(setTitle)}
        style={{ width: '100%', fontSize: '1.5rem', marginBottom: 10 }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={handleChange(setContent)}
        style={{ width: '100%', height: 200, fontSize: '1rem', marginBottom: 10 }}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={handleChange(setTags)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleSaveDraft}>Save Draft</button>
      <button onClick={handlePublish} style={{ marginLeft: 10 }}>
        Publish
      </button>
      {id && (
        <button
          onClick={handleDelete}
          style={{ marginLeft: 10, backgroundColor: 'red', color: 'white' }}
        >
          Delete
        </button>
      )}
      <div style={{ color: 'green', marginTop: 10 }}>{autoSaveMessage}</div>
    </div>
  );
}
