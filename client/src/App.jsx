import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Vocab from "./pages/Vocab";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/vocab"
            element={
              <PrivateRoute>
                <Vocab />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
