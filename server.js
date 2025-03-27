const express = require('express');
const path = require('path');
const axios = require('axios'); // We'll use axios for HTTP requests
const app = express();
const port = process.env.PORT || 3000;

// Configuration for external camera API
const CAMERA_API_BASE_URL = 'https://localhost:5000'; // Replace with actual camera API URL

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Camera control endpoints - now forwarding to external API
app.get('/takeimage', async (req, res) => {
  try {
    console.log('Requesting image capture from API...');
    const response = await axios.get(`${CAMERA_API_BASE_URL}/takeimage`);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('API request failed:', error.message);
    res.status(error.response?.status || 500).send('Failed to take image: API request error');
  }
});

app.get('/takevideo/:seconds', async (req, res) => {
  const seconds = req.params.seconds;
  try {
    console.log(`Requesting ${seconds} second video from API...`);
    const response = await axios.get(`${CAMERA_API_BASE_URL}/takevideo/${seconds}`);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('API request failed:', error.message);
    res.status(error.response?.status || 500).send(`Failed to record video: API request error`);
  }
});

app.get('/aidetect', async (req, res) => {
  try {
    console.log('Requesting AI detection from API...');
    const response = await axios.get(`${CAMERA_API_BASE_URL}/aidetect`);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('API request failed:', error.message);
    res.status(error.response?.status || 500).send('Failed to start AI detection: API request error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Using camera API at: ${CAMERA_API_BASE_URL}`);
});
