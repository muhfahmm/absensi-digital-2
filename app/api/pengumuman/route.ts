import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT *
      FROM tb_pengumuman
      ORDER BY created_at DESC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch pengumuman:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
