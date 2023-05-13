import React, { useState } from "react";

export const AuthContext = React.createContext({
  userName: "",
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  setUser: (name) => {},
});

const AuthProvider = (props) => {
  const [tokenValue, setTokenValue] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [userIdValue, setUserIdValue] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : null
  );
  const [userName, setUserName] = useState("");

  const setUser = (name) => {
    setUserName(name);
  };

  const login = (token, userId, tokenExpiration) => {
    setTokenValue(token);
    setUserIdValue(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("user", userId);
  };
  const logout = () => {
    setTokenValue(null);
    setUserIdValue(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const authContext = {
    userName,
    token: tokenValue,
    userId: userIdValue,
    login,
    logout,
    setUser,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
