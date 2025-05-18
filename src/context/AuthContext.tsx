"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  token: string;
  email: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("로그인 실패");
    const data = await res.json();
    setToken(data.token);
    setEmail(data.email);
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
  };

  const logout = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
