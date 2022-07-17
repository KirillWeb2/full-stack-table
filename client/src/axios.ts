import axios from 'axios';


// вшиваю url
const instance = axios.create({
  baseURL: "http://localhost:4444",
});

export default instance;