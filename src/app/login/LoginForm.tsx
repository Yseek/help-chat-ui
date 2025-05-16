"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login, logout, token, email } = useAuth();
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(inputEmail, password);
      alert("로그인 성공!");
    } catch (e) {
      alert("로그인 실패: " + e);
    }
  };

  const goToSignup = () => {
    router.push("/signup");
  };

  if (token) {
    return (
      <div style={styles.container}>
        <h2>환영합니다, {email} 님 🎉</h2>
        <button onClick={logout} style={styles.logoutButton}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <input
        type="email"
        value={inputEmail}
        placeholder="이메일"
        onChange={(e) => setInputEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.loginButton}>
        로그인
      </button>
      <button onClick={goToSignup} style={styles.signupButton}>
        회원가입
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    width: "250px",
  },
  loginButton: {
    padding: "10px",
    width: "150px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "8px",
  },
  signupButton: {
    padding: "10px",
    width: "150px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "10px",
    width: "150px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
