import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = process.env.VUE_APP_BASE_URL;

async function tokenRefresh() {
  try {
    const refreshToken = localStorage.getItem("auth.refreshToken");
    const { data } = await axios({
      url: `${baseURL}/auth/refresh`,
      method: "post",
      data: {
        refreshToken
      }
    });
    localStorage.setItem("auth.accessToken", data.data.accessToken);
    localStorage.setItem("auth.refreshToken", data.data.refreshToken);
    return {
      token: data.data.accessToken,
      refreshToken: data.data.refreshToken
    };
  } catch (err) {
    localStorage.removeItem("auth.accessToken");
    localStorage.removeItem("auth.refreshToken");
    throw err;
  }
}

const request = axios.create({
  baseURL
});

interface Claims {
  sub: number;
  iat: number;
  exp: number;
  t: "access" | "refresh";
}

// Add a request interceptor
request.interceptors.request.use(
  async config => {
    // Do something before request is sent
    config.headers["Content-Type"] = "application/json";
    if (config.url?.startsWith("auth")) return config;
    let token = localStorage.getItem("auth.accessToken");
    if (token) {
      const decoded = jwtDecode<Claims>(token);
      if (decoded.exp < Date.now() / 1000 + 50) {
        const refreshToken = localStorage.getItem("auth.refreshToken");
        if (
          !refreshToken ||
          jwtDecode<Claims>(refreshToken).exp < Date.now() / 1000
        ) {
          localStorage.removeItem("auth.refreshToken");
          localStorage.removeItem("auth.accessToken");
          window.location.reload();
          throw Error("Token expired");
        } else {
          const result = await tokenRefresh();
          token = result.token;
        }
      }
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },

  error => Promise.reject(error)
);

export { request };
