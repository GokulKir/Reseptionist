import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.API_URL, // Replace with your API base URL
  baseURL:"https://hubo2.domainenroll.com/api/v1/",
  timeout: 5000, // Set the timeout value in milliseconds
});

export default instance;
