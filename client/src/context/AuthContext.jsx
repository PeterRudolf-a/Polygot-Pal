import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextObj";
import jwtDecode from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired");
          logout();
        } else {
          setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            exp: decoded.exp,
          });
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
