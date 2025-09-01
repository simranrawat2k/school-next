import { connectDB } from "../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, address, city, state, contact, email_id, image } = body;

    const db = await connectDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, image]
    );

    return new Response(
      JSON.stringify({ message: "School added successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in addSchool API:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
