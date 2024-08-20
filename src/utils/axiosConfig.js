import axios from "axios";
import nProgress, { start, done } from "nprogress";
import { store } from "../redux/store";
import axiosRetry from "axios-retry";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

nProgress.configure({ showSpinner: false, trickleSpeed: 100 });

// Function to get a new access token
const getNewToken = async (data) => {
  // Replace with your actual API call
  const response = await axios.post("/api/v1/refresh-token", data);

  console.log("New access token: ", response.data.access_token);

  return response.data.DT;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = store?.getState()?.users?.account?.access_token;
    const refreshToken = store?.getState()?.users?.account?.refresh_token;
    config.headers["Authorization"] = `Bearer ${accessToken} ${refreshToken}`;
    start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Axios response: ", response);
    done();
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Token expired
    if (
      error.response.data &&
      error.response.data.EC === -1 &&
      error.response.data.EM === "Not authenticated the user"
    ) {
      try {
        const currentUserEmail = store?.getState()?.users?.account?.email;
        const refreshToken = store?.getState()?.users?.account?.refresh_token;
        console.log("Current user email: ", currentUserEmail);
        console.log("Current refresh token: ", refreshToken);
        const newToken = await getNewToken({
          email: currentUserEmail,
          refresh_token: refreshToken,
        });
        // Update the token in your axios instance
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken.access_token} ${newToken.refresh_token}`;
        // Retry the original request
        return instance(error.config);
      } catch (error) {
        // Failed to refresh token, redirect to login page
        window.location.href = "/login";
      }
    }

    return error && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

axiosRetry(instance, { retries: 3 });

export default instance;
