import { connectDB } from "../../../lib/db";

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
