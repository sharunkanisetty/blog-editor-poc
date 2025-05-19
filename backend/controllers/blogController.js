const Blog = require('../models/Blog');

exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;

    if (id) {
      await Blog.updateDraft(id, { title, content, tags });
      return res.json({ message: 'Draft updated', id });
    } else {
      const newId = await Blog.createDraft({ title, content, tags });
      return res.json({ message: 'Draft saved', id: newId });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving draft' });
  }
};

exports.publish = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    if (!id) return res.status(400).json({ error: 'Blog ID required to publish' });

    await Blog.publish(id, { title, content, tags });
    res.json({ message: 'Blog published', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error publishing blog' });
  }
};

// In blogController.js
exports.getAllBlogs = async (req, res) => {
  const { status } = req.query;  // get the status from query param

  // Pass status to model to filter
  const blogs = await Blog.getAll(status);
  res.json(blogs);
};



exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Blog.deleteById(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted', id });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Server error deleting blog' });
  }
};
