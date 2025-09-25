import { createContext, useEffect, useState } from "react";
import { IUser } from "../types/IUser";
import { IAuth } from "../types/IAuth";
import { IAuthContext } from "../types/IAuthContext";
import { usePostAuthLogin, usePostAuthRegister } from "../generated/api/queries";

export const authContext = createContext<IAuthContext | undefined>(undefined);

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

  async function login(user: IUser) {
    try {
      setLoading(true);
      setError(null);
      const res = await _login({ body: {
        password: user.password ?? '',
        username: user.username ?? ''
      } });
      const data = res?.data || {};
      const token = data.token;
      if (!token) {
        setError("Login failed: No token received");
        return;
      }

      const u = {
        username: data.username ?? user.username,
      };
      
      setCurrentUser(u);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(u));
      
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get("redirect") || "/";
      window.location.href = redirectUrl;
    } catch (err: any) {
      setError(err?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function register(user: IUser) {
    try {
      setLoading(true);
      setError(null);
      const res = await _register({ body: {
        password: user.password ?? "",
        username: user.username ?? ""
      } });
      if (!res.response.ok) {
        setError("Registration failed");
        return;
      }
      await login(user);
    } catch (err: any) {
      setError(err?.message || "Registration failed");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <authContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      login, 
      register, 
      logout, 
      error, 
      loading 
    }}>
      {children}
    </authContext.Provider>
  );
}