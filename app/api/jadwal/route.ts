import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT 
        j.*, 
        k.nama_kelas,
        m.nama as mata_pelajaran_nama,
        g.nama_lengkap as guru_nama
      FROM tb_jadwal j
      LEFT JOIN tb_kelas k ON j.kelas_id = k.id
      LEFT JOIN tb_mata_pelajaran m ON j.mata_pelajaran_id = m.id
      LEFT JOIN tb_guru g ON j.guru_id = g.id
      ORDER BY FIELD(j.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'), j.jam_mulai ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch jadwal:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kelas_id, mata_pelajaran_id, guru_id, hari, jam_mulai, jam_selesai, ruangan } = body;

    if (!kelas_id || !mata_pelajaran_id || !guru_id || !hari || !jam_mulai || !jam_selesai) {
      return NextResponse.json({ error: "Semua kolom wajib diisi kecuali ruangan" }, { status: 400 });
    }

    const result: any = await query(
      `INSERT INTO tb_jadwal (kelas_id, mata_pelajaran_id, guru_id, hari, jam_mulai, jam_selesai, ruangan) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [kelas_id, mata_pelajaran_id, guru_id, hari, jam_mulai, jam_selesai, ruangan || ""]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Failed to create jadwal:", error);
    return NextResponse.json({ error: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, kelas_id, mata_pelajaran_id, guru_id, hari, jam_mulai, jam_selesai, ruangan } = body;

    if (!id || !kelas_id || !mata_pelajaran_id || !guru_id || !hari || !jam_mulai || !jam_selesai) {
      return NextResponse.json({ error: "Semua kolom termasuk ID wajib diisi" }, { status: 400 });
    }

    await query(
      `UPDATE tb_jadwal SET kelas_id = ?, mata_pelajaran_id = ?, guru_id = ?, hari = ?, jam_mulai = ?, jam_selesai = ?, ruangan = ? WHERE id = ?`,
      [kelas_id, mata_pelajaran_id, guru_id, hari, jam_mulai, jam_selesai, ruangan || "", id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update jadwal:", error);
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

    await query(`DELETE FROM tb_jadwal WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete jadwal:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}

