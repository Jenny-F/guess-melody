import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
};

const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
