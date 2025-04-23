import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Vocab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-bold">Your Vocabulary List</h2>
      <p className="text-gray-600 mt-2">
        This is where your saved translations will appear.
      </p>
    </div>
  );
};

export default Vocab;
