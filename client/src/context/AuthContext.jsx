import React, { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, CREATE_USER } from "../graphql/mutations";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const [loginMutation] = useMutation(LOGIN_USER);
  const [signupMutation] = useMutation(CREATE_USER);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
          });
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      const newToken = data.loginUser.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      const message = err?.graphQLErrors?.[0]?.message || "Login failed.";
      alert(message);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await signupMutation({
        variables: { name, email, password },
      });
      // Adjusted depending on backend fix above
      // For backend returning token:
      const newToken = data.createUser.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      const decoded = jwtDecode(newToken);
      setUser({ id: decoded.sub, name: decoded.name, email: decoded.email });
      window.location.href = "/dashboard";

      // For backend NOT returning token, replace with:
      // alert("Signup successful! Please login.");
      // window.location.href = '/login';
    } catch (err) {
      console.error("Signup error:", err);
      const message = err?.graphQLErrors?.[0]?.message || "Signup failed.";
      alert(message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
