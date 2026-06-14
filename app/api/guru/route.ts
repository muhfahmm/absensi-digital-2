import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import QRCode from 'qrcode';

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
  let fileName: string | null = null;
  let filePath: string | null = null;
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

    const qrcode = randomUUID();

    // ensure qrcodes directory exists
    const qrcodesDir = path.join(process.cwd(), 'public', 'qrcodes');
    try {
      await fs.mkdir(qrcodesDir, { recursive: true });
    } catch (e) {}

    // generate png file for QR code
    fileName = `${qrcode}.png`;
    filePath = path.join(qrcodesDir, fileName);
    try {
      await QRCode.toFile(filePath, qrcode, { type: 'png', width: 300 });
    } catch (err) {
      console.error('Failed to generate QR image:', err);
    }

    const result: any = await query(
      `INSERT INTO tb_guru (nip, nama_lengkap, jenis_kelamin, tanggal_lahir, alamat, telepon, email, mata_pelajaran, jabatan, status, username, password, is_aktif, qrcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        is_aktif !== undefined ? is_aktif : 1,
        fileName
      ]
    );
    return NextResponse.json({ success: true, id: result.insertId, qrcode: fileName, qrcode_url: `/qrcodes/${fileName}` });
  } catch (error: any) {
    console.error("Failed to create guru:", error);
    // cleanup generated file if DB insert failed
    try {
      if (filePath) await fs.unlink(filePath).catch(() => {});
    } catch (e) {}
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

