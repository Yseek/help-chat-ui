// login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css"; // ✅ 스타일 import

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/");
    } catch (e) {
      console.log(`로그인 실패 : ${e}`);
      alert("로그인 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2>로그인</h2>
      <input
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        로그인
      </button>
    </div>
  );
}
