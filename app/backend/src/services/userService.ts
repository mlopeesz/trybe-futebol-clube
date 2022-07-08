import CustomError from '../helpers/CustomError';
import { ILogin, IToken } from '../interfaces';
import Bcrypt from '../auth/bcrypt';
import JWT from '../auth/jwt';
import Model from '../database/models/user';

export default class UserService {
  private model = Model;
  private jwt = new JWT();
  private bcrypt = new Bcrypt();

  async login(loginBody: ILogin) {
    const userData = await this.model.findOne({
      where: { email: loginBody.email },
    });
    if (!userData) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const { username, email, password, role } = userData;
    const validatePassword = await this.bcrypt.comparePassword(
      loginBody.password,
      password,
    );
    if (!validatePassword) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    return this.jwt.generateToken({ role, username, email });
  }

  async validate(token: string) {
    const validateToken = this.jwt.validateToken(token);
    const { data: { role } } = validateToken as IToken;
    return { role };
  }
}
