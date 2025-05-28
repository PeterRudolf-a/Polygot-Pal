import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-gray-100"
      >
        Polyglot Pal
      </Link>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="text-white hidden sm:inline">
              Hi, {user?.name?.split(" ")[0] || "User"}
            </span>

            <Link
              to="/dashboard"
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/flashcards"
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Flashcards
            </Link>
            <Link
              to="/vocab"
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              My Vocab
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
