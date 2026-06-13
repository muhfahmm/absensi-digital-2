import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';

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

export async function POST(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const {
      nip,
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir,
      alamat,
      telepon,
      email,
      mata_pelajaran,
      jabatan,
      status,
      username,
      password,
      is_aktif
    } = body;

    if (!nip || !nama_lengkap || !jenis_kelamin) {
      return NextResponse.json({ error: "NIP, Nama Lengkap, dan Jenis Kelamin wajib diisi" }, { status: 400 });
    }

    const finalUsername = username || nip;
    const finalPassword = password || "guru123";

    const result: any = await query(
      `INSERT INTO tb_guru (nip, nama_lengkap, jenis_kelamin, tanggal_lahir, alamat, telepon, email, mata_pelajaran, jabatan, status, username, password, is_aktif) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nip,
        nama_lengkap,
        jenis_kelamin,
        tanggal_lahir || null,
        alamat || "",
        telepon || "",
        email || "",
        mata_pelajaran || "",
        jabatan || "",
        status || "Honorer",
        finalUsername,
        finalPassword,
        is_aktif !== undefined ? is_aktif : 1
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error("Failed to create guru:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "NIP atau Username sudah digunakan" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const {
      id,
      nip,
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir,
      alamat,
      telepon,
      email,
      mata_pelajaran,
      jabatan,
      status,
      username,
      password,
      is_aktif
    } = body;

    if (!id || !nip || !nama_lengkap || !jenis_kelamin) {
      return NextResponse.json({ error: "ID, NIP, Nama Lengkap, dan Jenis Kelamin wajib diisi" }, { status: 400 });
    }

    const finalUsername = username || nip;

    let sql = `UPDATE tb_guru SET nip = ?, nama_lengkap = ?, jenis_kelamin = ?, tanggal_lahir = ?, alamat = ?, telepon = ?, email = ?, mata_pelajaran = ?, jabatan = ?, status = ?, username = ?, is_aktif = ?`;
    const params = [
      nip,
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir || null,
      alamat || "",
      telepon || "",
      email || "",
      mata_pelajaran || "",
      jabatan || "",
      status || "Honorer",
      finalUsername,
      is_aktif !== undefined ? is_aktif : 1
    ];

    if (password) {
      sql += `, password = ?`;
      params.push(password);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    await query(sql, params);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to update guru:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "NIP atau Username sudah digunakan" }, { status: 400 });
    }
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

    await query(`DELETE FROM tb_guru WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete guru:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

