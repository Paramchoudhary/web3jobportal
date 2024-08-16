import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;
