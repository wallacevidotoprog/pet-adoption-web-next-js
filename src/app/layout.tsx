"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/image/logo.png";
import Loading from "./components/loading/Loading";
import UserPage from "./components/user-page/login";
import "./globals.css";
import style from "./page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  return (
    <html lang="pt-BR" style={{ filter: "invert(0)" }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className={style.header}>
          <div className={style.logoContainer}>
            <Link href="/">
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <Link href="/pets">
            <button type="button">IR PARA PETS</button>
          </Link>
          <UserPage />
        </header>
        {children}
        {loading && <Loading />}
      </body>
    </html>
  );
}
