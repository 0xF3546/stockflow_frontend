import { createContext, useEffect, useState } from "react";
import { IUser } from "../types/IUser";
import { IAuth } from "../types/IAuth";
import { IAuthContext } from "../types/IAuthContext";
import { usePostAuthLogin, usePostAuthRegister } from "../generated/api/queries";

export const authContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: IAuth) {
  const lStore: any = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState<IUser | null>(JSON.parse(lStore));
  const { mutateAsync: _login } = usePostAuthLogin();
  const { mutateAsync: _register } = usePostAuthRegister();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  async function login({ username, password }: { username: string; password: string }) {
    try {
      const res = await _login({ body: { username, password } });
      const data = res?.data || {};
      const token = data.token;
      if (!token) return;
      const user = { username, ...data };
      setCurrentUser((_) => ({
        ..._,
        name: data.username ?? username
      }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get("redirect") || "/";
      window.location.href = redirectUrl;
    } catch (err) {
      // Fehlerbehandlung nach Bedarf
    }
  }

  async function register(user: any) {
    try {
      const res = await _register({ body: user });
      const data = res?.data || {};
      const token = null //data.token;
      if (!token) return;
      const newUser = { ...user, ...data };
      setCurrentUser(newUser);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.href = "/";
    } catch (err) {
      // Fehlerbehandlung nach Bedarf
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <authContext.Provider value={{ currentUser, setCurrentUser, login, register, logout }}>
      {children}
    </authContext.Provider>
  );
}