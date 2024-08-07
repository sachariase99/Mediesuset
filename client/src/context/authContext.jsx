import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
  };

  console.log("AuthProvider value:", { isLoggedIn, userEmail, login, logout });

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
