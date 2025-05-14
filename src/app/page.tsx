"use client"

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공!", data);
        alert("로그인 성공!");
      } else {
        console.error("로그인 실패", response.status);
        alert("로그인 실패! 다시 시도하세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류가 발생했습니다. 서버를 확인하세요.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>로그인</h1>
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
      <button onClick={handleLogin} style={styles.button}>
        로그인
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
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};