import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT * FROM otps WHERE email = ? AND otp = ? ORDER BY createdAt DESC LIMIT 1",
      [email, otp]
    );

    if (!rows.length) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
    }

    const record = rows[0];
    if (new Date(record.expiresAt) < new Date()) {
      return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
    }

    // Create user if not exists
    await db.execute("INSERT IGNORE INTO users (email) VALUES (?)", [email]);

    // Generate JWT session token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to verify OTP" }), { status: 500 });
  }
}
