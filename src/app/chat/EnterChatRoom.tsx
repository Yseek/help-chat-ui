"use client";

import { useAuth } from "@/context/AuthContext";

export default function EnterChatRoom() {
  const { token } = useAuth();

  const enter = async () => {
    const res = await fetch("http://localhost:8080/chat-room/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const text = await res.text();
    alert(text);
  };

  return (
    <button onClick={enter} disabled={!token}>
      채팅방 입장
    </button>
  );
}
