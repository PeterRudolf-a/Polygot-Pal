import { useState } from 'react';
import { signup } from '../../services/authService';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(name, email, password);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Create Account</button>
      {message && <p>{message}</p>}
    </form>
  );
}