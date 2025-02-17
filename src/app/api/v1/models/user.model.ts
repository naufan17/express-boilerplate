import { Model } from 'objection';

class User extends Model {
  id! : string;
  name! : string;
  email! : string;
  password! : string;
  createdAt! : Date;
  updatedAt! : Date;

  static get tableName() {
    return 'users';
  }
}

export default User;
