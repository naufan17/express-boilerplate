import { Model } from 'objection';

class Session extends Model {
  id!: string;
  user_id!: string;
  ip_address!: string;
  user_agent!: string;
  login_at!: Date;
  last_active_at!: Date;
  expires_at!: Date;

  static get tableName() {
    return 'sessions';
  }
}

export default Session;