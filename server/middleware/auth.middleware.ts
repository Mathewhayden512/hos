import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt.js';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }

  if (decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admin credentials required.' });
  }

  req.user = decoded;
  next();
}
