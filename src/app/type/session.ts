export interface formattedSession {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  status: string;
  login_at: Date;
  last_active_at: Date;
  expires_at: Date;
}