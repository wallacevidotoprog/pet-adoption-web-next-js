"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/image/logo.png";
import "./globals.css";
import "./page.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        throw new Error(
          `Erro ao logar: ${loginResponse.status} - ${errorText}`
        );
      }

      // Login bem-sucedido
      setShowLoginModal(false);
      setIsLoggedIn(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao realizar login.");
    }
  };

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className="header">
          <div className="logo-container">
            <Link href="/" passHlegacyBehavior>
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
          <Link href="/pets" passHlegacyBehavior>
            <button type="button">IR PARA PETS</button>
          </Link>

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
              <div className="login-modal">
                <form onSubmit={handleLogin}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Entrar</button>
                  {error && (
                    <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                  )}
                </form>
              </div>
            )}

            {/* Modal do usuário logado */}
            {showUserModal && isLoggedIn && (
              <div className="user-modal">
                <p>Bem-vindo, usuário!</p>
                <p>Aqui vão as opções futuras</p>
                <button onClick={() => setShowUserModal(false)}>Fechar</button>
              </div>
            )}
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}

// 'use client';
// import Image from "next/image";
// import logo from "../../public/image/logo.png";
// import "./globals.css";
// import "./page.css";
// import { useState } from "react";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [showModal, setShowModal] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const loginResponse = await fetch("http://localhost:3000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (!loginResponse.ok) {
//         const errorText = await loginResponse.text();
//         throw new Error(`Erro ao logar: ${loginResponse.status} - ${errorText}`);
//       }

//       // Sucesso!
//       setShowModal(false);
//       alert("Login realizado com sucesso!");
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Erro ao realizar login.");
//     }
//   };
//   return (
//     <html lang="pt-BR">
//       <body>
//       <header className="header">
//           <div className="logo-container">
//             <Image src={logo} alt="logo" width={100} height={100} />
//           </div>
//           <div className="login-container">
//             <button className="login-button" onClick={() => setShowModal(!showModal)}>
//               ENTRAR
//             </button>
//             {showModal && (
//               <div className="login-modal">
//                 <form onSubmit={handleLogin}>
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <label>Senha</label>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button type="submit">Entrar</button>
//                   {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
//                 </form>
//               </div>
//             )}
//           </div>
//         </header>
//         {children}
//       </body>
//     </html>
//   );
// }
