import { createContext, useState, useEffect } from "react";
import apiService from "../../apis/apiService";
/**
 * AuthContext to manage the user's authentication state.
 * Provides access to user details and authentication utility functions.
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage (if available)
    const savedUser = localStorage.getItem("El_User_Info");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userDetails, accessToken) => {
    // console.log(userDetails,accessToken)
    setUser(userDetails);
    localStorage.setItem("data", JSON.stringify(userDetails));
    localStorage.setItem("token", accessToken);
  };


  const logout = async () => {
    try {

      setUser(null);
      localStorage.removeItem("data");
      localStorage.removeItem("token");

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("data");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
