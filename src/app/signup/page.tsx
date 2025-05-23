"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.css"; // ✅ CSS 모듈 import

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error();
      alert("회원가입 성공! 로그인 해주세요.");
      router.push("/login");
    } catch {
      alert("회원가입 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <input
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button className={styles.signupButton} onClick={handleSignup}>
        회원가입
      </button>
    </div>
  );
}
