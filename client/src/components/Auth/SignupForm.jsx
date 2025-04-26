export default function SignupForm({ name, setName, email, setEmail, password, setPassword, handleSubmit, message }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
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
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Sign Up
      </button>
      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}