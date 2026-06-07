import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT *
      FROM tb_guru
      ORDER BY nama_lengkap ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch guru:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
