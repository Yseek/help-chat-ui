// app/signup/page.tsx
"use client"

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        window.location.href = "/"; // 로그인 페이지로 이동
      } else {
        alert("회원가입 실패. 다시 시도하세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>회원가입</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignup} style={styles.button}>
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
    height: "100vh",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    width: "250px",
  },
  button: {
    padding: "10px",
    width: "150px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
