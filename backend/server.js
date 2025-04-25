const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const users = {}; // In-memory user store (username: hashedPassword)

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).send('User exists');

  const hashed = await bcrypt.hash(password, 10);
  users[username] = hashed;
  res.send('Registered!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashed = users[username];
  if (!hashed) return res.status(401).send('User not found');

  const match = await bcrypt.compare(password, hashed);
  if (match) return res.send('Login success');
  res.status(403).send('Wrong password');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});