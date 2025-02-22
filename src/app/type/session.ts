export interface formattedSession {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  loginAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
}