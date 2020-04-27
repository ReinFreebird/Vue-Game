import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000/api/v1',
});

// TODO add auth header
// instance.defaults.headers.common['SOMETHING'] = 'something';

export default instance;
