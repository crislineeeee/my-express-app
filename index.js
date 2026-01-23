const express = require('express');
const app = express();
const port = 3000;

// ✅ Middleware
app.use(express.static('public')); // serve HTML/JS/CSS
app.use(express.json()); // parse JSON

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // allow other routes to work
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // serve your HTML file
});

app.get('/about', (req, res) => {
  res.send('This is the About page');
});

app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Data received: ${JSON.stringify(data)}`);
});

// Items
const items = ['Apple', 'Banana', 'Orange'];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body.item;
  if (newItem) {
    items.push(newItem);
  }
  res.json(items);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
