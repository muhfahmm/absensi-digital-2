import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-absensi-digital");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    let userId = null;
    let userRole = null;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        userId = payload.id;
        userRole = payload.role;
      } catch (err) {}
    }

    let sql = `
      SELECT k.*, g.nama_lengkap as wali_kelas_nama 
      FROM tb_kelas k 
      LEFT JOIN tb_guru g ON k.wali_kelas_id = g.id
    `;
    const params: any[] = [];

    if (userRole === "guru") {
      sql += ` WHERE k.wali_kelas_id = ?`;
      params.push(userId);
    }

    sql += ` ORDER BY k.nama_kelas ASC`;

    const data = await query(sql, params);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch kelas:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
