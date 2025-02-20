import { Model } from 'objection';

class Session extends Model {
  id!: string;
  userId!: string;
  ipAddress!: string;
  userAgent!: string;
  loginAt!: Date;
  lastActiveAt!: Date;
  expiresAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  
  static get tableName() {
    return 'sessions';
  }
}

export default Session;