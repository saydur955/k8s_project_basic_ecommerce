import * as jwt from 'jsonwebtoken';
import { jwt_payload } from '../types/general.type';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '2Horvaxi4Av3zsCcNiYkbDGyXCuaG310ntv';


export function jwtVerify(token: string): Promise<jwt_payload | null> {
  const secret_key = JWT_SECRET_KEY;

  return new Promise((resolve, reject) => {
    if (!secret_key) return resolve(null);

    jwt.verify(token, secret_key, (err, payload) => {
      if (err || !payload) {
        return resolve(null);
      } else {
        return resolve(payload as jwt_payload);
      }
    });
  });
}