import mariadb from 'mariadb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Sicherstellen, dass die .env aus dem Projektverzeichnis geladen wird
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout: 10000
});
 
// Verbindung testen
pool.getConnection()
  .then(conn => {
    console.log('Datenbankverbindung erfolgreich');
    conn.release();
  })
  .catch(err => {
    console.error('Datenbankverbindung fehlgeschlagen:', err);
  });
 
export default pool;