import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowGen Command Center",
  description: "AI-powered social media intelligence for agencies",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
