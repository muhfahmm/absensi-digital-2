import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';
import * as argon2 from 'argon2';

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

export async function POST(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;

  try {
    const { username, nama_lengkap, email, password } = await req.json();

    if (!username || !nama_lengkap || !password) {
      return NextResponse.json({ error: 'Username, nama lengkap, dan password wajib diisi' }, { status: 400 });
    }

    const existing: any = await query(`SELECT id FROM tb_admin WHERE username = ?`, [username]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'Username sudah digunakan' }, { status: 400 });
    }

    const hashedPassword = await argon2.hash(password);

    await query(
      `INSERT INTO tb_admin (username, password, nama_lengkap, email, role, is_aktif) VALUES (?, ?, ?, ?, 'admin', 1)`,
      [username, hashedPassword, nama_lengkap, email || '']
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to create admin:', error);
    return NextResponse.json({ error: 'Gagal membuat admin biasa' }, { status: 500 });
  }
}
