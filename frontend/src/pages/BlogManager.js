import React, { useState } from 'react';
import AllBlogsPage from './AllBlogsPage';
import EditorPage from './EditorPage';
import BlogView from './BlogView';

export default function BlogManager() {
  const [mode, setMode] = useState('list'); // 'list', 'edit', 'view'
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleEdit = (id) => {
    setSelectedBlogId(id);
    setMode('edit');
  };

  const handleView = (id) => {
    setSelectedBlogId(id);
    setMode('view');
  };

  const handleBack = () => {
    setSelectedBlogId(null);
    setMode('list');
  };

  return (
    <div>
      {mode === 'list' && <AllBlogsPage onEdit={handleEdit} onView={handleView} />}
      {mode === 'edit' && <EditorPage blogId={selectedBlogId} onBack={handleBack} />}
      {mode === 'view' && <BlogView blogId={selectedBlogId} onBack={handleBack} />}
    </div>
  );
}
