import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing 001 · BERENT.AI",
  description: "Vertrauliches Projektbriefing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#090806" }}>{children}</body>
    </html>
  );
}
