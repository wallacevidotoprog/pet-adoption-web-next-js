"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/image/logo.png";
import "./globals.css";
import style from "./page.module.css";
import UserPage from "@/components/user-page/login";
import Loading from "@/components/loading/Loading";

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
              <Image src={logo} alt="logo" width={80} height={80} />
            </Link>
          </div>

          <nav className={style.navMenu}>
            <input
              type="checkbox"
              id={style.menuToggle}
              className={style.menuToggle}
            />
            <label htmlFor={style.menuToggle} className={style.menuButton}>
              <span>a</span>
              <span>b</span>
              <span>c</span>
            </label>

            <ul className={style.menuList}>
              <li>
                <Link href="/pets" className={style.menuLink}>
                  PETS
                </Link>
              </li>
              <li>
                <Link href="/sobre" className={style.menuLink}>
                  SOBRE
                </Link>
              </li>
              <li>
                <Link href="/contato" className={style.menuLink}>
                  CONTATO
                </Link>
              </li>
            </ul>
          </nav>

          <div className={style.btnLogin}>
            <UserPage />
          </div>
        </header>
        {children}
        {loading && <Loading />}
      </body>
    </html>
  );
}
