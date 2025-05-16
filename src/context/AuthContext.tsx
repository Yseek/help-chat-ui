"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { loginApi } from "@/services/AuthService"; // ✅ 여기!

interface AuthContextType {
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const data = await loginApi(email, password); // ✅ 분리된 로직 사용
    setToken(data.token);
    setEmail(data.email); // ✅ 사용자 이메일 저장
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용되어야 합니다.");
  }
  return context;
};
