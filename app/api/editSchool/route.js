import { connectDB } from "../../../lib/db";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, address, city, state, contact, email_id, image } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing school id" }), { status: 400 });
    }

    const db = await connectDB();
    await db.query(
      "UPDATE schools SET name=?, address=?, city=?, state=?, contact=?, email_id=?, image=? WHERE id=?",
      [name, address, city, state, contact, email_id, image, id]
    );

    return new Response(JSON.stringify({ message: "School updated successfully" }), { status: 200 });
  } catch (err) {
    console.error("Error in editSchool API:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
