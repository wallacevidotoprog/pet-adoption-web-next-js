"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/image/logo.png";
import Loading from "./components/loading/Loading";
import UserPage from "./components/user-page/login";
import style from "./page.module.css";
import { useState } from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
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
    </>
  );
}
