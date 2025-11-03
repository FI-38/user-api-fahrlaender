import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import cors from 'cors';
import 'dotenv/config';
import authMiddleware from './middleware/auth.js';

import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import { getProfile, updateProfile } from './routes/profile.js';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

console.log('Zugelassene Hosts:', process.env.HOST.split(",") || '');
app.use(cors({
    origin: process.env.HOST.split(",") || '',
   // origin: '*',
    credentials: true
}));

app.post('/api/login', loginRoute);
app.post('/api/register', registerRoute);
app.get('/api/profile', ...getProfile);
app.put('/api/profile', ...updateProfile);

app.listen(process.env.PORT || 3001, () => {
    console.log('Server läuft auf Port ' + process.env.PORT);
});

// // CORS konfigurieren
// app.use(cors({
//     origin: process.env.HOST.split(",") || '', // React-URL
//     // origin: '*', // Everything-URL
//     credentials: true         // Erlaubt das Senden von Cookies, falls benötigt
// }));

// // Health
// app.get('/', (req, res) => res.status(200).json({ greeting: "Hey YOU!" }));

// // Registrierung
// app.post('/api/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body || {};
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'Alle Felder müssen ausgefüllt sein.' });
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({ error: 'Das Passwort muss mindestens 8 Zeichen lang sein.' });
//     }

//     const conn = await pool.getConnection();
//     try {
//       const [exists] = await conn.query(
//         'SELECT id FROM `user` WHERE username = ? OR email = ? LIMIT 1',
//         [username, email.toLowerCase()]
//       );
//       if (exists.length > 0) {
//         return res.status(409).json({ error: 'Benutzername oder E-Mail bereits registriert.' });
//       }

//       const passwordHash = await bcrypt.hash(password, 10);
//       const [result] = await conn.query(
//         'INSERT INTO `user` (username, email, password_hash) VALUES (?, ?, ?)',
//         [username, email.toLowerCase(), passwordHash]
//       );
//       return res.status(201).json({
//         message: 'Registrierung erfolgreich!',
//         userId: result.insertId, username, email: email.toLowerCase()
//       });
//     } finally {
//       conn.release();
//     }
//   } catch (err) {
//     console.error('Fehler bei /api/register:', err);
//     return res.status(500).json({ error: 'Interner Serverfehler.' });
//   }
// });

// // Login
// app.post('/api/login', async (req, res) => {
//   try {
//     const { username, password } = req.body || {};
//     if (!username || !password) {
//       return res.status(400).json({ error: 'username und password erforderlich' });
//     }

//     const conn = await pool.getConnection();
//     try {
//       const rows = await conn.query(
//         'SELECT id, username, password_hash FROM `user` WHERE username = ? LIMIT 1',
//         [username]
//       );
//       console.log(username, password);
//       console.log(rows);

//       const user = rows[0];
//       if (!user) return res.status(400).json({ error: 'Benutzer nicht gefunden.' });

//       const ok = await bcrypt.compare(password, user.password_hash);
//       if (!ok) return res.status(400).json({ error: 'Falsches Passwort.' });

//       const token = jwt.sign(
//         { id: user.id, username: user.username },
//         process.env.JWT_SECRET_KEY, { expiresIn: '1h' }
//       );

//       return res.status(200).json({ token, userId: user.id, username: user.username });
//     } finally {
//       conn.release();
//     }
//   } catch (err) {
//     console.error('Fehler bei /api/login:', err);
//     return res.status(500).json({ error: 'Interner Serverfehler.' });
//   }
// });
// app.put('/api/profile', authMiddleware, async (req, res) => {
//     const userId = req.user.id;
//     const { firstname, surname, bio } = req.body;
 
//     const conn = await pool.getConnection();
 
//     try {
//         // Aktualisieren der Profildaten in der `user_profile`-Tabelle
//         await conn.query(
//           `INSERT INTO user_profile (user_id, firstname, surname, bio)
//            VALUES (?, ?, ?, ?)
//            ON DUPLICATE KEY UPDATE
//            firstname = VALUES(firstname),
//            surname = VALUES(surname),
//            bio = VALUES(bio)`,
//           //  { userId, firstname, surname, bio }
//           ( userId, firstname, surname, bio )
//           );
//         res.json({ message: 'Profil erfolgreich aktualisiert' });
//     } catch (error) {
//         console.error('Fehler beim Aktualisieren des Profils:', error);
//         res.status(500).json({ error: 'Fehler beim Aktualisieren des Profils' });
//     } finally {
//         conn.release();
//     }
// });

// app.get('/api/profile', authMiddleware, async (req, res) => {
//     const userId = req.user.id;
 
//     const conn = await pool.getConnection();
 
//     try {
//         const [userResult] = await conn.query(
//             `SELECT p.firstname, p.surname, p.bio
//              FROM user u
//              LEFT JOIN user_profile p ON u.id = p.user_id
//              WHERE u.id = ?`,
//             [userId]
//         );
//         if (userResult.length === 0) {
//             return res.status(404).json({ error: 'Profil nicht gefunden' });
//         }
 
//         res.json(userResult);
 
//     } catch (error) {
//         console.error('Fehler beim Abrufen des Profils:', error);
//         res.status(500).json({ error: 'Fehler beim Abrufen des Profils' });
//     } finally {
//         conn.release();
//     }
// });

// // Start
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`API läuft auf http://localhost:${PORT}`));
