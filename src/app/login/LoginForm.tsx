"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./LoginForm.module.css";

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
      <div className={styles.container}>
        <h2>환영합니다, {email} 님 🎉</h2>
        <button onClick={logout} className={styles.logoutButton}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>로그인</h2>
      <input
        type="email"
        value={inputEmail}
        placeholder="이메일"
        onChange={(e) => setInputEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        로그인
      </button>
      <button onClick={goToSignup} className={styles.signupButton}>
        회원가입
      </button>
    </div>
  );
}