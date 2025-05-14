import { Model } from 'objection';
import Session from './session.model';

class User extends Model {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  phone_number?: string;
  address?: string;
  profile_picture?: string;
  is_verified!: boolean;
  created_at!: Date;
  updated_at!: Date;
  sessions?: Session[];

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: 'users.id',
          to: 'sessions.user_id',
        },
      },
    }
  }
}

export default User;
