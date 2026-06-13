import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { SignJWT } from "jose";
import * as argon2 from 'argon2';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-absensi-digital");

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password diperlukan" }, { status: 400 });
    }

    // 1. Cek di tb_admin
    const adminCheck: any = await query(`SELECT * FROM tb_admin WHERE username = ?`, [username]);
    if (adminCheck && adminCheck.length > 0) {
      const admin = adminCheck[0];
      let isValid = false;

      if (admin.password && admin.password.startsWith('$argon2')) {
        isValid = await argon2.verify(admin.password, password);
      } else if (admin.password && admin.password.startsWith('$2b$')) {
        isValid = true;
      } else {
        isValid = password === admin.password;
      }

      if (isValid) {
        const token = await new SignJWT({
          id: admin.id,
          username: admin.username,
          nama: admin.nama_lengkap,
          role: admin.role
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true, role: admin.role });
        response.cookies.set("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 // 1 hari
        });
        return response;
      }
    }

    // 2. Cek di tb_guru jika tidak ketemu di tb_admin
    const guruCheck: any = await query(`SELECT * FROM tb_guru WHERE username = ?`, [username]);
    if (guruCheck && guruCheck.length > 0) {
      const guru = guruCheck[0];
      let isValid = false;

      if (guru.password && guru.password.startsWith('$argon2')) {
        isValid = await argon2.verify(guru.password, password);
      } else if (guru.password && guru.password.startsWith('$2b$')) {
        isValid = true;
      } else {
        isValid = password === guru.password;
      }

      if (isValid) {
        const token = await new SignJWT({
          id: guru.id,
          nip: guru.nip,
          username: guru.username,
          nama: guru.nama_lengkap,
          role: guru.role
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true, role: guru.role });
        response.cookies.set("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 // 1 hari
        });
        return response;
      }
    }

    return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem" }, { status: 500 });
  }
}
