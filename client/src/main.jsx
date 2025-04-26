import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
