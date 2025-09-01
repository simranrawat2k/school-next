import Link from "next/link";

export default function Home() {
  return (
    <main className="home-container">
      <div className="home-card">
        <h1>Welcome to School Project</h1>
        <p>Choose an option below:</p>

        <div className="home-actions">
          <Link href="/addSchool" className="btn-primary">
            ➕ Add School
          </Link>
          <Link href="/showSchool" className="btn-secondary">
            📖 Show Schools
          </Link>
        </div>
      </div>
    </main>
  );
}
