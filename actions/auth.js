import cookie from "js-cookie";
import Router from "next/router";

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  setCookie("token", data.data.token);
  setLocalStorage("user", data.data.user);
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export const logout = (next) => {
  removeLocalStorage("user");
  removeCookie("token");

  Router.push("/");
};
