"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { token, email, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div>
        {token ? (
          <>
            <span>👋 {email}님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>로그인</button>
            <button onClick={() => router.push("/signup")}>회원가입</button>
          </>
        )}
      </div>

      <div>
        <button onClick={() => router.push("/")}>🏠 메인 화면</button>
      </div>
    </header>
  );
}
