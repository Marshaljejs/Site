import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

let surveys = [];
let nextId = 1;

const users = [{ id: 1, name: 'Admin', email: 'admin@it.kz' }];
const categories = [
  { id: 1, title: 'IT Technology' },
  { id: 2, title: 'Education' },
];

app.post('/surveys', (req, res) => {
  const { title, user_id, category_id } = req.body;
  if (!title) return res.status(400).json({ error: 'Тақырыпты жазыңыз!' });
  const survey = { id: nextId++, title, user_id: user_id || 1, category_id: category_id || 1 };
  surveys.push(survey);
  res.status(201).json({ id: survey.id, message: 'Сауалнама қосылды!' });
});

app.get('/surveys', (req, res) => {
  res.json(surveys);
});

app.put('/surveys/:id', (req, res) => {
  const { title } = req.body;
  const survey = surveys.find(s => s.id === parseInt(req.params.id));
  if (!survey) return res.status(404).json({ error: 'Табылмады' });
  survey.title = title;
  res.json({ message: 'Жаңартылды!' });
});

app.delete('/surveys/:id', (req, res) => {
  surveys = surveys.filter(s => s.id !== parseInt(req.params.id));
  res.json({ message: 'Жойылды!' });
});

app.use(express.static(join(__dirname, 'dist')));

app.get('/{*path}', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер ${PORT} портында қосулы`));