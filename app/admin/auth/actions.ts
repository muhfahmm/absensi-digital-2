'use server';

import { query } from "@/app/config/db";
import * as argon2 from 'argon2';

export async function handleRegister(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  // Force role to superadmin for this registration endpoint
  const role = 'superadmin';

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

    // Insert admin baru ke database (only superadmin allowed here)
    if (role !== 'superadmin') {
      return { error: 'Role tidak valid' };
    }

    const hashedPassword = await argon2.hash(password);

    await query(
      `INSERT INTO tb_admin (username, password, nama_lengkap, role) VALUES (?, ?, ?, ?)`,
      [username, hashedPassword, username, role]
    );

    return { success: true };
  } catch (error: any) {
    console.error('Register error:', error);
    return { error: 'Terjadi kesalahan sistem saat mendaftar' };
  }
}
