import React, { createContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, CREATE_USER } from '../graphql/mutations';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const [loginMutation] = useMutation(LOGIN_USER);
  const [signupMutation] = useMutation(CREATE_USER);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser({ id: decoded.sub, name: decoded.name, email: decoded.email });
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const { data } = await loginMutation({ variables: { email, password } });
    const newToken = data.loginUser.token;
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const signup = async (name, email, password) => {
    await signupMutation({ variables: { name, email, password } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};