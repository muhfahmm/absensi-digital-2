import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "siswa" atau "guru"

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    if (!type || !["siswa", "guru"].includes(type)) {
      return NextResponse.json({ error: "Type tidak valid" }, { status: 400 });
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Hanya file image (JPG, PNG, WebP) yang diizinkan" },
        { status: 400 }
      );
    }

    // Validasi ukuran file (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar (max 5MB)" },
        { status: 400 }
      );
    }

    // Buat direktori jika belum ada
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate nama file unik
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const filename = `${type}_${timestamp}.${ext}`;
    const filepath = join(UPLOAD_DIR, filename);

    // Convert file ke buffer dan simpan
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Return path yang dapat diakses dari browser
    const publicPath = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      filename: filename,
      path: publicPath,
      message: "File berhasil diupload"
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal mengupload file" },
      { status: 500 }
    );
  }
}
