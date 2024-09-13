import React, { createContext, useState, useEffect } from "react";
import { svrURL } from './constants';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      fetchHistory(token);
    } else {
      sessionStorage.removeItem("token");
      setHistory([]);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const fetchHistory = async (token) => {
    try {
      const response = await fetch(`${svrURL}/user/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, history, fetchHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
