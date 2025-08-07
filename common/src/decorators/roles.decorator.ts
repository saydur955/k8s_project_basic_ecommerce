import { Reflector } from '@nestjs/core';
import { auth_role } from '../types/general.type';

export const Roles = Reflector.createDecorator<auth_role[]>();
