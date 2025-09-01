import { connectDB } from "../../../lib/db";
import path from "path";
import fs from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image");

    let imagePath = "";

    if (file && file.name) {
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);

      imagePath = "/schoolImages/" + file.name;
    }

    const db = await connectDB();
    await db.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imagePath]
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
