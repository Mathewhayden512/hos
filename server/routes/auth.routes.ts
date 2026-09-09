import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { queryOne } from '../db/database.js';
import { generateToken } from '../utils/jwt.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await queryOne<{ id: number; email: string; password_hash: string; role: string }>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken({ userId: user.id, email: user.email, role: user.role });

    return res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

export default router;
