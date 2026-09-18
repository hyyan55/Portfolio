import crypto from 'crypto';
import { getDb, saveDb } from './db';

// Secret key for HMAC token signing (server-side only)
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'hayyan-portfolio-super-secret-key-2026-sudan-medical-dev';

// Initial admin username
export const ADMIN_USERNAME = 'hyyan55';

// Precomputed PBKDF2 hash of the initial password with server salt
// Salt: "hayyan-kassala-tootil-salt-987"
// Plaintext: "mghoolsd.com"
const FIXED_SALT = 'hayyan-kassala-tootil-salt-987';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Stored hash for the admin credential (never plaintext)
let adminCredentials = {
  username: ADMIN_USERNAME,
  salt: FIXED_SALT,
  passwordHash: hashPassword('mghoolsd.com', FIXED_SALT),
};

export function verifyAdminCredentials(username: string, password: string): boolean {
  if (!username || !password) return false;
  try {
    const db = getDb();
    const currentCreds = (db as any).auth || adminCredentials;
    if (username.trim().toLowerCase() !== currentCreds.username.toLowerCase()) {
      return false;
    }
    const computedHash = hashPassword(password, currentCreds.salt);
    return crypto.timingSafeEqual(
      Buffer.from(computedHash, 'hex'),
      Buffer.from(currentCreds.passwordHash, 'hex')
    );
  } catch {
    if (username.trim().toLowerCase() !== adminCredentials.username.toLowerCase()) {
      return false;
    }
    const computedHash = hashPassword(password, adminCredentials.salt);
    return crypto.timingSafeEqual(
      Buffer.from(computedHash, 'hex'),
      Buffer.from(adminCredentials.passwordHash, 'hex')
    );
  }
}

export function updateAdminPassword(newPassword: string): void {
  const newSalt = crypto.randomBytes(16).toString('hex');
  const updated = {
    username: ADMIN_USERNAME,
    salt: newSalt,
    passwordHash: hashPassword(newPassword, newSalt)
  };
  adminCredentials = updated;
  try {
    const db = getDb();
    (db as any).auth = updated;
    saveDb(db);
  } catch (err) {
    console.error("Failed to persist new password to db:", err);
  }
}

export function generateToken(username: string): string {
  const payload = {
    sub: username,
    role: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadB64, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return false;
    }
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
