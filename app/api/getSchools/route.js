import { connectDB } from "../../../lib/db";

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");

    // Add base64 
    const schoolsWithImages = rows.map((school) => ({
      ...school,
      image: school.image
        ? `data:image/jpeg;base64,${school.image}`
        : null,
    }));

    return new Response(JSON.stringify(schoolsWithImages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
