import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL, // Replace with your API base URL
  timeout: 5000, // Set the timeout value in milliseconds
  headers: {
    'Content-Type': 'application/json', // Replace with the appropriate content type
    'Authorization': 'Bearer token' // Replace with any required authorization headers
  }
});

export default instance;
