export default function LoginForm({ email, setEmail, password, setPassword, handleSubmit, error }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Log In
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
