"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [token, setToken] = useState("");

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
        setToken(data.token);
        alert("로그인 성공!");
      } else {
        const errorData = await response.json();
        console.error("로그인 실패", errorData);
        alert(errorData.message || "로그인 실패! 다시 시도하세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류가 발생했습니다. 서버를 확인하세요.");
    }
  };

  const goToSignup = () => {
    router.push("/signup");
  }

  const enterChatRoom = async () => {
    try {
      const response = await fetch("http://localhost:8080/chat-room/1", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ JWT 토큰 사용
        },
      });

      if (response.ok) {
        const result = await response.text();
        alert("채팅방 입장 성공: " + result);
      } else {
        alert("채팅방 입장 실패! 인증되지 않은 사용자입니다.");
      }
    } catch (error) {
      console.error("채팅방 입장 중 오류:", error);
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
      <button onClick={goToSignup} style={styles.signupButton}>
        회원가입
      </button>
      <button onClick={enterChatRoom} style={styles.button} disabled={!token}>
        채팅방 입장 (room1)
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
    signupButton: {
    padding: "10px",
    width: "150px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    cursor: "pointer",
  },
};