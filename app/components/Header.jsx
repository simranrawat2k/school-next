"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Header({ setToken }) {
   const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    if (setToken) setToken(null); 
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    setIsLoggedIn(!!loggedIn);
  }, []);

  

  return (
    <header className="header">
      <h2 className="logo">🏫 School Project</h2>
      {isLoggedIn ? (
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      ) : (
        <Link href="/login" className="btn-login">
          🔑 Login
        </Link>
      )}
    </header>
  );
}
