import React, { createContext, useState, useContext, useEffect } from "react";

import { fetchUser } from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (token) => {
    try {
      const response = await fetchUser(token);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    token ? fetchUserData(token) : setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
