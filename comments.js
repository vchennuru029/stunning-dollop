// Create web server
// Run "node comments.js" in terminal
// Open "http://localhost:3000" in browser
// When you refresh the page, the comments will be saved in the comments.json file

// Import the required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an express application
const app = express();

// Set the port number
const port = 3000;

// Set the path to the comments.json file
const commentsPath = path.join(__dirname, 'comments.json');

// Set the path to the HTML file
const htmlPath = path.join(__dirname, 'index.html');

// Read the comments from the comments.json file
function readComments() {
  try {
    const comments = fs.readFileSync(commentsPath, 'utf8');
    return JSON.parse(comments);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Write the comments to the comments.json file
function writeComments(comments) {
  try {
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
  } catch (error) {
    console.error(error);
  }
}

// Read the HTML file and send it to the client
app.get('/', (request, response) => {
  response.sendFile(htmlPath);
});

// Read the comments from the comments.json file and send them to the client
app.get('/comments', (request, response) => {
  const comments = readComments();
  response.json(comments);
});

// Parse the JSON data received from the client
app.use(express.json());

// Add a new comment to the comments.json file
app.post('/comments', (request, response) => {
  const comments = readComments();
  const comment = request.body;
  comments.push(comment);
  writeComments(comments);
  response.json(comment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Open "http://localhost:3000" in your browser
// Add some comments
// Refresh the page
// The comments will be saved in the comments