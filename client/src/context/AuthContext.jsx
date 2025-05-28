import React, { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, CREATE_USER } from "../graphql/mutations";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

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
      const newToken = data.createUser.token;

      if (!newToken) {
        console.error("No token returned from signup.");
        return;
      }

      localStorage.setItem("token", newToken);
      setToken(newToken);
      const decoded = jwtDecode(newToken);
      setUser({ id: decoded.sub, name: decoded.name, email: decoded.email });

      navigate("/dashboard"); // Better than window.location.href
    } catch (err) {
      console.error("Signup error:", err);
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
