"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupApi } from "@/services/AuthService";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signupApi(email, password);
      alert("회원가입 성공!");
      router.push("/"); // 로그인 페이지로 이동
    } catch (error) {
      alert("회원가입 실패: " + (error as Error).message);
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
