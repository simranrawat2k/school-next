"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("token"); // ✅ match login storage key
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ remove correct key
    setIsLoggedIn(false);
  };

  return (
    <main className="home-container">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Welcome</h1>
        <p className="hero-subtitle">
          Discover schools across the city.  
          Login to add and manage your own schools.
        </p>

        <div className="hero-actions">
          <Link
            href="/addSchool"
            className={`btn-primary ${!isLoggedIn ? "btn-disabled" : ""}`}
          >
            ➕ Add School
          </Link>
          <Link href="/showSchool" className="btn-secondary">
            📖 Show Schools
          </Link>
        </div>
      </section>
    </main>
  );
}
