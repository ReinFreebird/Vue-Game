export const updateValue = (state, payload) => {
  state.value = payload;
};

export const authUser = (state, userData) => {
  state.idToken = userData.token;
  state.userSuccess = userData.userSuccess;
};

export const userDetail = (state, userCurrentEmail) => {
  state.userEmail = userCurrentEmail;
};
