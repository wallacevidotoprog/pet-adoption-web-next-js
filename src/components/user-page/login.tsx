"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@public/image/logo.png";
import LoginModal from "./LoginModal";
import "./login.css";
import UserModal from "./modalUser";
import { useRouter } from "next/router";

export default function UserPage() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();

    const checkAuth = async () => {
      try {
        const me = await fetch("http://localhost:3000/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: controller.signal,
        });
        setIsLoggedIn(me.ok ? true : false);
      } catch (error) {
        console.log(
          "const me = await fetch(http://localhost:3000/auth/me =>",
          error
        );
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    return () => controller.abort();
  }, [pathname]);

  const loginModalRef = useRef<HTMLDivElement>(null);
  const userModalRef = useRef<HTMLDivElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLoginModal &&
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target as Node)
      ) {
        setShowLoginModal(false);
      }

      if (
        showUserModal &&
        userModalRef.current &&
        !userModalRef.current.contains(event.target as Node)
      ) {
        setShowUserModal(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showLoginModal) setShowLoginModal(false);
        if (showUserModal) setShowUserModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLoginModal, showUserModal]);

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    setShowUserModal(false);
    useRouter().push('/')
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <button
          className="login-button"
          onClick={() => setShowLoginModal(!showLoginModal)}
        >
          ENTRAR
        </button>
      ) : (
        <Image
          src={logo}
          alt="avatar"
          width={40}
          height={40}
          className="avatar"
          onClick={() => setShowUserModal(!showUserModal)}
        />
      )}

      {/* Modal de login */}
      {showLoginModal && !isLoggedIn && (
        <div className="login-modal" ref={loginModalRef}>
          <LoginModal
            onSuccess={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
          />
        </div>
      )}

      {/* Modal do usuário logado */}
      {showUserModal && isLoggedIn && (
        <div className="user-modal" ref={userModalRef}>
          <UserModal onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
}
