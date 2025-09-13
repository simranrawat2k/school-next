"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "./components/Header";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <main className="home-container">
      {/* Header */}
       <Header />

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Welcome</h1>
        <p className="hero-subtitle">
          Discover schools across the city. Login to add and manage your own
          schools.
        </p>

        <div className="hero-actions">
          {isLoggedIn ? (
            <Link href="/addSchool" className="btn-primary">
              ➕ Add School
            </Link>
          ) : (
            <button
              className="btn-primary"
              onClick={() => toast.info("Please login to add a school")}
            >
              ➕ Add School
            </button>
          )}

          <Link href="/showSchool" className="btn-secondary">
            📖 Show Schools
          </Link>
        </div>
      </section>
    </main>
  );
}
