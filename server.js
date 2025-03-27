const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JavaScript, images, etc.)
app.use(express.static(path.join(__dirname)));

// Route all requests to the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
