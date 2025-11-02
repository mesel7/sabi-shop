import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import { Outfit } from "next/font/google";

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-jp",
});

const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${notoJP.variable} ${notoKR.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
