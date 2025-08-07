import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { jwtSign } from 'src/utils/jwt';
import { UserSignInDto } from './dto/signin-user.dto';
import { auth_role, jwt_payload } from '@bivajon/common';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(reqBody: CreateUserDto) {

    const isExist = await this.repo.findOneBy({ email: reqBody.email });
    if (isExist) {
      throw new NotFoundException('user already exist');
    }

    const user = this.repo.create({ ...reqBody });

    const savedUser = await this.repo.save(user);

    return savedUser;
  }


  async signIn(reqBody: UserSignInDto) {

    const user = await this.repo.findOneBy({ email: reqBody.email });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const userPaylod: jwt_payload = {
      id: user.id,
      role: auth_role.user
    }
    

    const jwtToken = await jwtSign(userPaylod);

    if(!jwtToken) {
      throw new BadRequestException('Invalid user');
    }

    return {
      ...user,
      jwtToken
    }

  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, reqBody: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, reqBody);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }

}
