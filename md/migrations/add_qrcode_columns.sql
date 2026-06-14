-- Migration: add qrcode column to existing tables
ALTER TABLE tb_guru ADD COLUMN IF NOT EXISTS qrcode VARCHAR(255) NULL UNIQUE;
ALTER TABLE tb_siswa ADD COLUMN IF NOT EXISTS qrcode VARCHAR(255) NULL UNIQUE;
