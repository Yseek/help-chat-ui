"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { token, email } = useAuth();
  const router = useRouter();

  const handleEnter = async () => {
    if (!token) {
      alert("로그인을 해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("채팅방 생성 실패");
      }

      const { roomId } = await res.json();
      console.log("생성된 채팅방 ID:", roomId);
      router.push(`/chat/${roomId}`);
    } catch (err) {
      console.error("채팅방 입장 오류:", err);
      alert("채팅방 입장 중 오류가 발생했습니다.");
    }
  };
  
  
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>메인 페이지</h1>
      <button onClick={handleEnter}>채팅방 입장</button>
    </div>
  );
}
