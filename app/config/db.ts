import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "db_sekolah_absensi",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = any>(sql: string, params: any[] = []) {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

export default pool;