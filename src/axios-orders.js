import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-f8427.firebaseio.com/',
});

export default instance;
