import { useState } from 'react';
import { login } from '../../services/authService';
import { useAuth } from '../../context/UseAuth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: doLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      doLogin(res.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
