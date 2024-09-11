
import bcrypt from 'bcrypt';

export async function saltAndHashPassword(password:any) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
