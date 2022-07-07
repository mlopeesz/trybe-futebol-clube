import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init(
  {
    username: STRING,
    role: STRING,
    email: STRING,
    password: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  }
);

export default User;
