import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to Polyglot Pal 🌍
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Translate text, build your vocabulary, and practice with flashcards!
      </p>
      <div className="space-x-4">
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/vocab"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          View Vocabulary
        </Link>
      </div>
    </div>
  );
};

export default Home;
