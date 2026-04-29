const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('./saualnama.db', (err) => {
    if (err) console.error("Базаға қосылу қатесі:", err.message);
    else console.log("SQLite базасы дайын.");
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        user_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`);
    db.run(`INSERT OR IGNORE INTO users (id, name, email) VALUES (1, 'Admin', 'admin@it.kz')`);
    db.run(`INSERT OR IGNORE INTO categories (id, title) VALUES (1, 'IT Technology'), (2, 'Education')`);
});

app.post('/surveys', (req, res) => {
    const { title, user_id, category_id } = req.body;
    if (!title) return res.status(400).json({ error: "Тақырыпты жазыңыз!" });

    const sql = `INSERT INTO surveys (title, user_id, category_id) VALUES (?, ?, ?)`;
    db.run(sql, [title, user_id || 1, category_id || 1], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Сауалнама қосылды!" });
    });
});

app.get('/surveys', (req, res) => {
    const sql = `
        SELECT s.id, s.title, u.name as author, c.title as category 
        FROM surveys s
        JOIN users u ON s.user_id = u.id
        JOIN categories c ON s.category_id = c.title
    `;
    db.all("SELECT * FROM surveys", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.put('/surveys/:id', (req, res) => {
    const { title } = req.body;
    db.run(`UPDATE surveys SET title = ? WHERE id = ?`, [title, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Жаңартылды!" });
    });
});

app.delete('/surveys/:id', (req, res) => {
    db.run(`DELETE FROM surveys WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Жойылды!" });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер http://localhost:${PORT} портында қосулы`));