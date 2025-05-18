"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./ChatRoom.module.css";
import { useAuth } from "@/context/AuthContext";

type ChatMessage = {
  roomId: number;
  sender: "me" | "you";
  message: string;
  sendAt: string;
};

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { token, email } = useAuth();

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const roomIdStr = Array.isArray(roomId) ? roomId[0] : roomId ?? "";

      const res = await fetch(`http://localhost:8080/chat/history?roomId=${roomIdStr}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ 토큰 추가
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const formatted = (data as ChatMessage[]).map((msg): ChatMessage => {
        const isMine = msg.sender === email;
        return {
          roomId: Date.now(), // 고유 id 없으면 fallback
          sender: isMine ? "me" : "you",
          message: msg.message,
          sendAt: new Date(msg.sendAt).toTimeString().slice(0, 5),
        };
      });


      setMessages(formatted);
    } catch (err) {
      console.error("과거 메시지 불러오기 실패", err);
    }
  };

  fetchHistory();

    const eventSource = new EventSource(
      `http://localhost:8080/chat/stream?roomId=${roomId}`
    );

  eventSource.onmessage = (event) => {
    const raw = JSON.parse(event.data);

    const isMine = raw.sender === email;
    const formatted: ChatMessage = {
      roomId: raw.id ?? Date.now(),
      sender: isMine ? "me" : "you",
      message: raw.message,
      sendAt: new Date(raw.sendAt).toTimeString().slice(0, 5),
    };

    setMessages((prev) => [...prev, formatted]);
  };


  eventSource.onerror = (err) => {
      console.error("SSE 연결 오류:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [roomId, token, email]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const now = new Date();
    const message = {
      roomId,
      sender: email,
      message: input,
      time: now.toTimeString().slice(0, 5),
    };

    await fetch("http://localhost:8080/chat/send", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ 토큰 추가
      },
      body: JSON.stringify(message),
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>채팅방 ID: {roomId}</h2>
      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.sender === "me" ? styles.me : styles.you
            }`}
          >
            <div className={styles.text}>{msg.message}</div>
            <div className={styles.time}>{msg.sendAt}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          전송
        </button>
      </div>
    </div>
  );
}
