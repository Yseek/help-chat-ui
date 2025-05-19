"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";


type ChatRoom = {
  roomId: string;
  email: string;
};

export default function HomePage() {
  const { token, email } = useAuth();
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

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

  const handleEnterRoom = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  // 관리자 전용: 채팅방 리스트 조회
  useEffect(() => {
    if (email === "admin@naver.com" && token) {
      const fetchRooms = async () => {
        try {
          const res = await fetch("http://localhost:8080/chat/rooms", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("채팅방 목록 불러오기 실패");

          const data: ChatRoom[] = await res.json();
          setChatRooms(data);
        } catch (err) {
          console.error("채팅방 목록 오류:", err);
        }
      };

      fetchRooms();
    }
  }, [email, token]);
  
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>메인 페이지</h1>
      <button onClick={handleEnter}>채팅방 입장</button>

      {email === "admin@naver.com" && (
        <>
          <h2 style={{ marginTop: "2rem" }}>모든 채팅방 목록</h2>
          {chatRooms.length === 0 ? (
            <p>열린 채팅방이 없습니다.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {chatRooms.map((room) => (
                <li key={room.roomId} style={{ marginBottom: "1.5rem" }}>
                  <strong>방 ID:</strong> {room.roomId} <br />
                  <strong>생성자:</strong> {room.email} <br />
                  <button onClick={() => handleEnterRoom(room.roomId)}>
                    입장하기
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
