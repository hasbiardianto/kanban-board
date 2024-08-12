import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const Nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Nunito.className}>{children}</body>
    </html>
  );
}
