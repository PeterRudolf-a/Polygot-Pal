import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Polyglot Pal
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <span>Hello, {user.name.split(" ")[0]}</span>
            <Link to="/vocab" className="hover:underline">
              My Vocab
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
