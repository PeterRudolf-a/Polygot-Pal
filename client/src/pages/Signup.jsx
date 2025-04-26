import { useState } from "react";
import { useAuth } from "../context/UseAuth";
import SignupForm from "../components/Auth/SignupForm";

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      setMessage("Account created! Please log in.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <SignupForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      message={message}
    />
  );
}
