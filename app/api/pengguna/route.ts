import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';

export async function GET(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;

  try {
    const url = new URL(req.url);
    const role = url.searchParams.get('role');
    const validRoles = ['superadmin', 'admin'];
    const whereClause = role && validRoles.includes(role)
      ? `WHERE role = ?`
      : '';
    const sql = `
      SELECT id, username, nama_lengkap, email, role, is_aktif, created_at
      FROM tb_admin
      ${whereClause}
      ORDER BY FIELD(role, 'superadmin', 'admin'), nama_lengkap ASC
    `;
    const params = whereClause ? [role] : [];

    const admins = await query(sql, params);
    return NextResponse.json({ admins });
  } catch (error) {
    console.error("Failed to fetch pengguna:", error);
    return NextResponse.json({ error: "Gagal memuat daftar pengguna" }, { status: 500 });
  }
}
