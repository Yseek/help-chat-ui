"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./EnterChatRoom.module.css";

export default function EnterChatRoom() {
  const { token, email } = useAuth();

  const enter = async () => {
    const res = await fetch("http://localhost:8080/chat-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ 이걸 반드시 넣어야 함
        Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify({ email }),
    });
    const { roomId } = await res.json(); // ✅ 여기서 roomId를 받음
    console.log("생성된 채팅방 ID:", roomId);
  };

  return (
    <div className={styles.container}>
      <button onClick={enter} disabled={!token} className={styles.enterButton}>
        채팅방 입장
      </button>
    </div>
  );
}