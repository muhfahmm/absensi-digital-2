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
      SELECT 
        s.*, 
        k.nama_kelas
      FROM tb_siswa s
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      ORDER BY k.nama_kelas ASC, s.nama_lengkap ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch siswa:", error);
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
      nis,
      nisn,
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir,
      tempat_lahir,
      alamat,
      telepon_ortu,
      email,
      kelas_id,
      username,
      password,
      is_aktif
    } = body;

    if (!nis || !nama_lengkap || !jenis_kelamin) {
      return NextResponse.json({ error: "NIS, Nama Lengkap, dan Jenis Kelamin wajib diisi" }, { status: 400 });
    }

    const finalUsername = username || nis;
    const finalPassword = password || "siswa123";

    const qrcode = randomUUID();

    // ensure qrcodes directory exists
    const qrcodesDir = path.join(process.cwd(), 'public', 'qrcodes');
    try {
      await fs.mkdir(qrcodesDir, { recursive: true });
    } catch (e) {}

    fileName = `${qrcode}.png`;
    filePath = path.join(qrcodesDir, fileName);
    try {
      await QRCode.toFile(filePath, qrcode, { type: 'png', width: 300 });
    } catch (err) {
      console.error('Failed to generate QR image:', err);
    }

    const result: any = await query(
      `INSERT INTO tb_siswa (nis, nisn, nama_lengkap, jenis_kelamin, tanggal_lahir, tempat_lahir, alamat, telepon_ortu, email, kelas_id, username, password, is_aktif, qrcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nis,
        nisn || "",
        nama_lengkap,
        jenis_kelamin,
        tanggal_lahir || null,
        tempat_lahir || "",
        alamat || "",
        telepon_ortu || "",
        email || "",
        kelas_id || null,
        finalUsername,
        finalPassword,
        is_aktif !== undefined ? is_aktif : 1,
        fileName
      ]
    );
    return NextResponse.json({ success: true, id: result.insertId, qrcode: fileName, qrcode_url: `/qrcodes/${fileName}` });
  } catch (error: any) {
    console.error("Failed to create siswa:", error);
    // cleanup generated file if DB insert failed
    try {
      if (filePath) await fs.unlink(filePath).catch(() => {});
    } catch (e) {}
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "NIS atau Username sudah digunakan" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const id = body.id;
    const nis = body.nis;
    const nisn = body.nisn;
    const nama_lengkap = body.nama_lengkap;
    const jenis_kelamin = body.jenis_kelamin;
    const tanggal_lahir = body.tanggal_lahir;
    const tempat_lahir = body.tempat_lahir;
    const alamat = body.alamat;
    const telepon_ortu = body.telepon_ortu;
    const email = body.email;
    const kelas_id = body.kelas_id;
    const username = body.username;
    const password = body.password;
    const is_aktif = body.is_aktif;

    if (!id || !nis || !nama_lengkap || !jenis_kelamin) {
      return NextResponse.json({ error: "ID, NIS, Nama Lengkap, dan Jenis Kelamin wajib diisi" }, { status: 400 });
    }

    const finalUsername = username || nis;

    let sql = `UPDATE tb_siswa SET nis = ?, nisn = ?, nama_lengkap = ?, jenis_kelamin = ?, tanggal_lahir = ?, tempat_lahir = ?, alamat = ?, telepon_ortu = ?, email = ?, kelas_id = ?, username = ?, is_aktif = ?`;
    const params = [
      nis,
      nisn || "",
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir || null,
      tempat_lahir || "",
      alamat || "",
      telepon_ortu || "",
      email || "",
      kelas_id || null,
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
    console.error("Failed to update siswa:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "NIS atau Username sudah digunakan" }, { status: 400 });
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

    await query(`DELETE FROM tb_siswa WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete siswa:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

