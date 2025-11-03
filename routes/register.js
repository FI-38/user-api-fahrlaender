import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

export default async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(400).json({ error: 'Alle Felder sind erforderlich' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein' });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const existing = await conn.query(
            'SELECT id FROM user WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Benutzername oder E-Mail bereits vergeben' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await conn.query(
            'INSERT INTO user (username, name, email, password_hash) VALUES (?, ?, ?, ?)',
            [username, name, email, hashedPassword]
        );

        const token = jwt.sign(
            { id: result.insertId, username: username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Registrierung erfolgreich',
            token,
            userId: result.insertId
        });

    } catch (error) {
        console.error('Registrierungsfehler:', error);
        res.status(500).json({ error: 'Ein Fehler ist aufgetreten' });
    } finally {
        if (conn) conn.release();
    }
};