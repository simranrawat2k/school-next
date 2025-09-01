import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to School Project</h1>
      <p>Choose an option below:</p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/addSchool" style={{ marginRight: "20px" }}>
          ➕ Add School
        </Link>
        <Link href="/showSchool">
          📖 Show Schools
        </Link>
      </div>
    </main>
  );
}
