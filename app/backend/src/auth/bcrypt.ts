import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  comparePassword = async (password:string, encrypted: string) => {
    const isValid = await bcrypt.compare(password, encrypted);
    return isValid;
  };
}
