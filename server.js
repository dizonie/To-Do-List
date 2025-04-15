const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: 'cosmic_tasks_db', 
  waitForConnections: true,
  connectionLimit: 10
});

app.use(express.json());
app.use(express.static('public'));

app.get('/api/tasks', async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cosmic interference! Failed to get tasks.' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, priority, category } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required!' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, priority, category) VALUES (?, ?, ?, ?)',
      [title, description, priority, category || 'general']
    );
    res.status(201).json({ id: result.insertId, title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Warp core breach! Failed to add task.' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  try {
   
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found in our galaxy!' });
    }
    
    const currentTask = rows[0];
    const updatedTask = {
      title: updates.title !== undefined ? updates.title : currentTask.title,
      description: updates.description !== undefined ? updates.description : currentTask.description,
      priority: updates.priority !== undefined ? updates.priority : currentTask.priority,
      category: updates.category !== undefined ? updates.category : (currentTask.category || 'general'),
      is_completed: updates.is_completed !== undefined ? updates.is_completed : currentTask.is_completed
    };
    
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, priority = ?, category = ?, is_completed = ? WHERE id = ?',
      [updatedTask.title, updatedTask.description, updatedTask.priority, updatedTask.category, updatedTask.is_completed, taskId]
    );
    
    res.json({ message: 'Task updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Alien interference! Update failed.' });
  }
});



app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Task sucked into black hole!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Shields up! Deletion failed.' });
  }
});

app.listen(port, () => {
  console.log(`\uD83D\uDE80 Cosmic to-do app running on http://localhost:${port}`);
});
