export default function Footer() {
  return (
    <footer className="mt-10 bg-[color:var(--color-foreground)] text-gray-400 font-outfit">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-3">
        {/* 브랜드 */}
        <div>
          {/* 제목 */}
          <h2 className="text-xl tracking-wide text-gray-200">SABI SHOP</h2>
          <p className="mt-3 text-sm leading-relaxed">
            A minimal coffee store demo built with Next.js, React, Redux, and
            Tailwind CSS. Designed for portfolio & study purposes.
          </p>
        </div>

        {/* 정보 */}
        <div className="flex flex-col text-sm">
          <p>
            <span>Tech Stack:</span> React · Next.js · Redux · Tailwind CSS
          </p>
          <p>
            <span>Hosting:</span> Vercel
          </p>
        </div>

        {/* 하단 */}
        <div className="text-sm">
          © {new Date().getFullYear()} SABI SHOP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
