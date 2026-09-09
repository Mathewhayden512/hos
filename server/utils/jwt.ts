import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'wise_hospital_super_secret_jwt_key_2026';

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}
