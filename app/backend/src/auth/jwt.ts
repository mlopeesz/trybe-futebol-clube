import { sign, verify } from 'jsonwebtoken';
import { IUserToken } from '../interfaces/index';

export default class JWT {
  private jwtSecret = 'jwt_secret';
  private config = { expiresIn: '30d' };

  generateToken(user: IUserToken): string {
    const token = sign({ data: user }, this.jwtSecret, this.config);
    return token;
  }

  validateToken(token: string) {
    try {
      const res = verify(token, this.jwtSecret);
      return res;
    } catch (error) {
      return console.log('Erro em verificar token.');
    }
  }
}
