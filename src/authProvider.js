import { API_URL } from "./utils/constants";
import Cookies from "./helpers/Cookies";

export default {
  login: ({ username, password }) => {
    const identifier = username; // strapi expects 'identifier' and not 'username'
    const request = new Request(`${API_URL}/api/auth/local`, {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        Cookies.setCookie("token", response.jwt, 1);
      });
  },

  logout: () => {
    Cookies.deleteCookie("token");

    return Promise.resolve();
  },

  checkAuth: () => {
    return Cookies.getCookie("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      Cookies.deleteCookie("token");

      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = Cookies.getCookie("token");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
