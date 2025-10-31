"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

type Props = {
  mode: "login" | "signup";
  onClose: () => void;
};

export default function AuthModal({ mode: initialMode, onClose }: Props) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const title = mode === "login" ? "로그인" : "회원가입";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, pw);
        onClose();
      } else {
        await signup(email, pw, name);
        onClose();
      }
    } catch (err: any) {
      setError(err.message ?? "실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">{title}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 회원가입일 때만 이름 */}
            {mode === "signup" && (
              <div>
                <label className="block text-sm mb-1">이름</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">비밀번호</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="6자 이상"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-60"
            >
              {submitting ? "처리 중..." : title}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "login" ? (
              <>
                아직 계정이 없나요?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="underline text-black"
                >
                  회원가입
                </button>
              </>
            ) : (
              <>
                이미 계정이 있나요?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="underline text-black"
                >
                  로그인
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
