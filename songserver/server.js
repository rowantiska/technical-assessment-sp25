const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get('/comments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
        res.status(200).json(result.rows);
        console.log(result.rows)
    } catch (error) {
        console.error(error);
    }
});

app.post('/comments', async (req, res) => {
    console.log('Request Body:', req.body);
    const { username, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (username, comment) VALUES ($1, $2) RETURNING *',
            [username, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

//For date/song data
app.get('/appdata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM songData ORDER BY date DESC');
        res.status(200).json(result.rows);
        console.log(result.rows)
    } catch (error) {
        console.error(error);
    }
});
//For date/song data
app.post('/appdata', async (req, res) => {
    console.log('Request Body:', req.body.songsofday);
    const songsOfDay = req.body.songsofday;
    try {
        const result = await pool.query(
            'INSERT INTO songdata (songsOfDay) VALUES ($1)',
            [JSON.stringify(songsOfDay)]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});