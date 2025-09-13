"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };

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
