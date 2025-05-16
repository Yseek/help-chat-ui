"use client";

import LoginForm from "./login/LoginForm";
import EnterChatRoom from "./chat/EnterChatRoom";
import { AuthProvider } from "@/context/AuthContext";

export default function HomePage() {
  return (
    <AuthProvider>
      <main>
        <LoginForm />
        <EnterChatRoom />
      </main>
    </AuthProvider>
  );
}