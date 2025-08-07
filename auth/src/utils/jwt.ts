import { jwt_payload } from '@bivajon/common';
import * as jwt from 'jsonwebtoken';

const expire_time = 86400 * 7; // 7 day
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '2Horvaxi4Av3zsCcNiYkbDGyXCuaG310ntv';


export function jwtSign(payload: jwt_payload): Promise<string | null> {
  const secret_key = JWT_SECRET_KEY;

  return new Promise((resolve, reject) => {
    if (!secret_key) return resolve(null);

    jwt.sign(payload, secret_key, {
      expiresIn: expire_time
    }, (err, token) => {
      if (err || !token) {
        return reject(null);
      } else {
        return resolve(token);
      }
    });
  });
}