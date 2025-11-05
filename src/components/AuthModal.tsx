"use client";

import { useId, useState } from "react";
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

  // 고유 id(유의미할 필요는 없고 구분만 가능하게)
  const modalTitleId = useId();
  const nameId = useId();
  const emailId = useId();
  const pwId = useId();
  const errorId = useId();

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
    } catch {
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
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
    >
      <div className="bg-[color:var(--color-background)] rounded-xs w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-300 text-lg cursor-pointer"
          type="button"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 id={modalTitleId} className="text-xl font-bold mb-6 text-center">
            {title}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-describedby={error ? errorId : undefined}
          >
            {mode === "signup" && (
              <div>
                <label htmlFor={nameId} className="block text-sm mb-1">
                  {tAuth("name")}
                </label>
                <input
                  id={nameId}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xs px-3 py-2"
                  placeholder={tAuth("placeholderName")}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label htmlFor={emailId} className="block text-sm mb-1">
                {tAuth("email")}
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xs px-3 py-2"
                placeholder={tAuth("placeholderEmail")}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor={pwId} className="block text-sm mb-1">
                {tAuth("password")}
              </label>
              <input
                id={pwId}
                name="password"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full border border-gray-300 rounded-xs px-3 py-2"
                placeholder={tAuth("placeholderPassword")}
                required
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </div>

            {error && (
              <p id={errorId} className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xs px-4 py-2 bg-[color:var(--color-foreground)]
                text-[color:var(--color-background)]
                hover:opacity-75 transition-opacity duration-300 cursor-pointer disabled:opacity-75"
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
                  className="text-[color:var(--color-foreground)] cursor-pointer"
                  type="button"
                >
                  {tAuth("switchToSignup")}
                </button>
              </>
            ) : (
              <>
                {tAuth("haveAccount")}{" "}
                <button
                  onClick={() => resetForm("login")}
                  className="text-[color:var(--color-foreground)] cursor-pointer"
                  type="button"
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
