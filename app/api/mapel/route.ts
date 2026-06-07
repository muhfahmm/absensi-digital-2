import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT m.*, g.nama_lengkap as guru_nama 
      FROM tb_mata_pelajaran m
      LEFT JOIN tb_guru g ON m.guru_id = g.id
      ORDER BY m.nama ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch mapel:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
