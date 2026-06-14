import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { requireSuperadmin } from '@/app/lib/auth';

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
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const { nama, guru_id } = body;

    if (!nama) {
      return NextResponse.json({ error: "Nama pelajaran wajib diisi" }, { status: 400 });
    }

    const result: any = await query(
      `INSERT INTO tb_mata_pelajaran (nama, guru_id) VALUES (?, ?)`,
      [nama, guru_id || null]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Failed to create mapel:", error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await requireSuperadmin();
  if (auth) return auth;
  try {
    const body = await req.json();
    const { id, nama, guru_id } = body;

    if (!id || !nama) {
      return NextResponse.json({ error: "ID dan Nama pelajaran wajib diisi" }, { status: 400 });
    }

    await query(
      `UPDATE tb_mata_pelajaran SET nama = ?, guru_id = ? WHERE id = ?`,
      [nama, guru_id || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update mapel:", error);
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

    await query(`DELETE FROM tb_mata_pelajaran WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete mapel:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

