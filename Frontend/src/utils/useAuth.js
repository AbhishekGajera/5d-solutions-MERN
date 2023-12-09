// useAuth.js

import { useState } from "react";
import { signinUser, registerUser } from "./apiUtils";

const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const signin = async (body) => {
    const data = await signinUser(body);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.data));
    setUser(data?.data);

    return data;
  };

  const register = async (body) => {
    const data = await registerUser(body);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.data));
    setUser(data?.data);

    return data;
  };

  const logout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    setUser(null);
  };

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  return { user, signin, register, logout, getUser };
};

export default useAuth;
