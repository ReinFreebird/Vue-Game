import axios from '../axios-auth';

export const updateValue = ({ commit }, payload) => {
  commit('updateValue', payload);
};

export const signup = ({ commit }, authData) => {
  axios
    .post('/auth/register', {
      name: authData.name,
      email: authData.email,
      password: authData.password,
    })
    .then(res => {
      console.log(res);
      commit('authUser', {
        token: res.data.token,
        userSuccess: res.data.success,
      });
    })
    .catch(error => console.log(error));
};

export const signin = ({ commit }, authData) => {
  return new Promise((resolve, reject) => {
    axios
    .post('/auth/login', {
      email: authData.email,
      password: authData.password,
    })
    .then(res => {
      console.log(res);
      commit('authUser', {
        token: res.data.token,
        userSuccess: res.data.success,
      });
      // update axios authentication token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
      resolve()
    })
    .catch(error => {
      console.log(error)
      reject(error)
    });
  })
};

export const fetchUser = ({ commit, state }) => {
  if (!state.idToken) {
    return;
  }
  axios
    .get('/auth/me')
    .then(res => {
      console.log(res);
      const data = res.data.data;
      const userEmail = data.email;
      commit('userDetail', userEmail);
    })
    .catch(error => console.log(error));
};
