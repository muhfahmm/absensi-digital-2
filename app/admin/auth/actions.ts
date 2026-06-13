'use server';

import { query } from "@/app/config/db";

export async function handleRegister(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as string) || 'admin';

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi' };
  }

  try {
    // Cek apakah username sudah terdaftar di tb_admin
    const adminCheck: any = await query(`SELECT id FROM tb_admin WHERE username = ?`, [username]);
    if (adminCheck && adminCheck.length > 0) {
      return { error: 'Username sudah digunakan oleh admin lain' };
    }

    // Cek apakah username sudah terdaftar di tb_guru
    const guruCheck: any = await query(`SELECT id FROM tb_guru WHERE username = ?`, [username]);
    if (guruCheck && guruCheck.length > 0) {
      return { error: 'Username sudah digunakan oleh guru' };
    }

    // Insert admin baru ke database
    if (!['admin', 'superadmin'].includes(role)) {
      return { error: 'Role tidak valid' };
    }

    await query(
      `INSERT INTO tb_admin (username, password, nama_lengkap, email, role) VALUES (?, ?, ?, ?, ?)`,
      [username, password, username, `${username}@admin.com`, role]
    );

    return { success: true };
  } catch (error: any) {
    console.error('Register error:', error);
    return { error: 'Terjadi kesalahan sistem saat mendaftar' };
  }
}