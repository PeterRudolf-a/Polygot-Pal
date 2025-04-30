import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>
);
