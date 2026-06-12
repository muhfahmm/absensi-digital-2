import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT m.*, g.nama_lengkap as guru_nama 
      FROM tb_mata_pelajaran m
      LEFT JOIN tb_guru g ON m.guru_id = g.id
      ORDER BY m.nama ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch mapel:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kode, nama, deskripsi, guru_id, is_aktif } = body;

    if (!kode || !nama) {
      return NextResponse.json({ error: "Kode dan Nama pelajaran wajib diisi" }, { status: 400 });
    }

    const result: any = await query(
      `INSERT INTO tb_mata_pelajaran (kode, nama, deskripsi, guru_id, is_aktif) VALUES (?, ?, ?, ?, ?)`,
      [kode, nama, deskripsi || "", guru_id || null, is_aktif !== undefined ? is_aktif : 1]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Failed to create mapel:", error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, kode, nama, deskripsi, guru_id, is_aktif } = body;

    if (!id || !kode || !nama) {
      return NextResponse.json({ error: "ID, Kode, dan Nama pelajaran wajib diisi" }, { status: 400 });
    }

    await query(
      `UPDATE tb_mata_pelajaran SET kode = ?, nama = ?, deskripsi = ?, guru_id = ?, is_aktif = ? WHERE id = ?`,
      [kode, nama, deskripsi || "", guru_id || null, is_aktif !== undefined ? is_aktif : 1, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update mapel:", error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });
    }

    await query(`DELETE FROM tb_mata_pelajaran WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete mapel:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

