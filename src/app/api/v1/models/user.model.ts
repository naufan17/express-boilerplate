import { Model } from 'objection';

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

  static get tableName() {
    return 'users';
  }
}

export default User;
