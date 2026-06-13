import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';

export async function GET() {
  const auth = await requireSuperadmin();
  if (auth) return auth;

  try {
    const admins = await query(`
      SELECT id, username, nama_lengkap, email, role, is_aktif, created_at
      FROM tb_admin
      ORDER BY FIELD(role, 'superadmin', 'admin'), nama_lengkap ASC
    `);

    const gurus = await query(`
      SELECT id, nip, username, nama_lengkap, email, status, is_aktif, created_at
      FROM tb_guru
      ORDER BY nama_lengkap ASC
    `);

    return NextResponse.json({ admins, gurus });
  } catch (error) {
    console.error("Failed to fetch pengguna:", error);
    return NextResponse.json({ error: "Gagal memuat daftar pengguna" }, { status: 500 });
  }
}
