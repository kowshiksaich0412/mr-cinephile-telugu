import { createContext, useContext, useMemo, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("adminProfile") || "null")
  );

  const login = async (email, password) => {
    const response = await authApi.login({ email, password });
    setToken(response.token);
    setAdmin(response.user);
    localStorage.setItem("adminToken", response.token);
    localStorage.setItem("adminProfile", JSON.stringify(response.user));
  };

  const logout = () => {
    setToken("");
    setAdmin(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminProfile");
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token, admin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
