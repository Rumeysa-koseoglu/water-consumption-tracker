import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
    });

export const query = (text: string, params?: any[]) => pool.query(text, params);
