const pool = require('../config/db');

const Blog = {
  async createDraft({ title, content, tags }) {
    const [result] = await pool.query(
      `INSERT INTO blogs (title, content, tags, status) VALUES (?, ?, ?, 'draft')`,
      [title, content, tags]
    );
    return result.insertId;
  },

  async updateDraft(id, { title, content, tags }) {
    await pool.query(
      `UPDATE blogs SET title=?, content=?, tags=?, updated_at=NOW() WHERE id=? AND status='draft'`,
      [title, content, tags, id]
    );
  },

  async publish(id, { title, content, tags }) {
    await pool.query(
      `UPDATE blogs SET title=?, content=?, tags=?, status='published', updated_at=NOW() WHERE id=?`,
      [title, content, tags, id]
    );
  },

  async getAll(status) {
    let query = 'SELECT * FROM blogs';
    let params = [];
  
    if (status === 'draft' || status === 'published') {
      query += ' WHERE status = ?';
      params.push(status);
    }
  
    query += ' ORDER BY updated_at DESC';
  
    const [rows] = await pool.query(query, params);
    return rows;
  },
  

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM blogs WHERE id = ?`, [id]);
    return rows[0];
  },

  // Add this method to delete a blog by id
  async deleteById(id) {
    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Blog;
