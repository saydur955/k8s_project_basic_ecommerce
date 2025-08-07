import 'express';
import { jwt_payload } from 'src/users/types/user.type';

declare global {
  namespace Express {
    interface Request {
      user?: jwt_payload;
    }
  }
}