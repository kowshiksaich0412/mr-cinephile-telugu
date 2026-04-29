import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../services/api";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err, "Invalid login credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Mr Cinephile Telugu Dashboard</p>
        <div className="mt-5 grid gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2"
          />
          <button disabled={loading} className="rounded bg-brand-red px-4 py-2 font-semibold">
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default AdminLoginPage;
