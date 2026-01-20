"use client";

import AuthModal from "@/features/auth/AuthModal.client";

type Props = {
  showAuth: null | "login" | "signup";
  onClose: () => void;
};

// Auth 모달 렌더만 담당
// showAuth가 있을 때만 렌더
export default function AuthModalHost({ showAuth, onClose }: Props) {
  if (!showAuth) return null;
  return <AuthModal mode={showAuth} onClose={onClose} />;
}
