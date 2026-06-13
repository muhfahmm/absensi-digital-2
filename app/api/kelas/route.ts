import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { requireSuperadmin } from '@/app/lib/auth';

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

export async function POST(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const { nama_kelas, jurusan, ruangan, kapasitas, wali_kelas_id, is_aktif } = body;

    if (!nama_kelas) {
      return NextResponse.json({ error: "Nama kelas wajib diisi" }, { status: 400 });
    }

    const result: any = await query(
      `INSERT INTO tb_kelas (nama_kelas, jurusan, ruangan, kapasitas, wali_kelas_id, is_aktif) VALUES (?, ?, ?, ?, ?, ?)`,
      [nama_kelas, jurusan || "", ruangan || "", kapasitas || 30, wali_kelas_id || null, is_aktif !== undefined ? is_aktif : 1]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Failed to create kelas:", error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const { id, nama_kelas, jurusan, ruangan, kapasitas, wali_kelas_id, is_aktif } = body;

    if (!id || !nama_kelas) {
      return NextResponse.json({ error: "ID dan Nama kelas wajib diisi" }, { status: 400 });
    }

    await query(
      `UPDATE tb_kelas SET nama_kelas = ?, jurusan = ?, ruangan = ?, kapasitas = ?, wali_kelas_id = ?, is_aktif = ? WHERE id = ?`,
      [nama_kelas, jurusan || "", ruangan || "", kapasitas || 30, wali_kelas_id || null, is_aktif !== undefined ? is_aktif : 1, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update kelas:", error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });
    }

    await query(`DELETE FROM tb_kelas WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete kelas:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

