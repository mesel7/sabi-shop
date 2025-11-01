"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useTranslations } from "next-intl";

type Props = {
  mode: "login" | "signup";
  onClose: () => void;
};

export default function AuthModal({ mode: initialMode, onClose }: Props) {
  const { login, signup } = useAuth();
  const tAuth = useTranslations("auth");

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const title = mode === "login" ? tAuth("login") : tAuth("signup");

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
    } catch (err) {
      // 로그인 오류, 회원가입 오류
      setError(
        mode === "login" ? tAuth("invalidCredential") : tAuth("errorGeneric")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = (nextMode: "login" | "signup") => {
    setMode(nextMode);
    setEmail("");
    setPw("");
    setName("");
    setError("");
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
            {mode === "signup" && (
              <div>
                <label className="block text-sm mb-1">{tAuth("name")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder={tAuth("placeholderName")}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-1">{tAuth("email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder={tAuth("placeholderEmail")}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">{tAuth("password")}</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder={tAuth("placeholderPassword")}
                required
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-60"
            >
              {submitting ? tAuth("processing") : title}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "login" ? (
              <>
                {tAuth("noAccount")}{" "}
                <button
                  onClick={() => resetForm("signup")}
                  className="underline text-black"
                >
                  {tAuth("switchToSignup")}
                </button>
              </>
            ) : (
              <>
                {tAuth("haveAccount")}{" "}
                <button
                  onClick={() => resetForm("login")}
                  className="underline text-black"
                >
                  {tAuth("switchToLogin")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
