import Link from "next/link";

export default function Home() {
  return (
    <main className="home-container">
      <div className="home-card">
        <h1>🎓 Welcome to School Project</h1>
        <p className="subtitle">
          A simple platform to explore and manage schools.  
          Anyone can browse, but login is required to add/manage schools.
        </p>

        <div className="home-actions">
          
          <Link href="/showSchool" className="btn-secondary">
            📖 Show Schools
          </Link>
          <Link href="/login" className="btn-primary">🔑 Login </Link>
          <Link href="/addSchool" className="btn-primary">
            ➕ Add School
          </Link>
        </div>
      </div>
    </main>
  );
}
