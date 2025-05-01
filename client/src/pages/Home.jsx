import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to Polyglot Pal{" "}
        <span role="img" aria-label="globe">
          🌍
        </span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Translate text, build your vocab, and practice with flashcards!
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
