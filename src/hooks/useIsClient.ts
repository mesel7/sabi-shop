"use client";
import { useEffect, useState } from "react";

/**
 * 클라이언트 환경(브라우저)에서만 true가 되는 훅
 * SSR 시엔 false → Hydration mismatch 방지
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
