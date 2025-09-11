import { connectDB } from "../../../lib/db";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // school id from query string

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing school id" }), { status: 400 });
    }

    const db = await connectDB();
    await db.query("DELETE FROM schools WHERE id = ?", [id]);

    return new Response(JSON.stringify({ message: "School deleted successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error in deleteSchool API:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
