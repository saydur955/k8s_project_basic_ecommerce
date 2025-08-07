import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminSignInDto } from './dto/signin-user.dto';
import { auth_role, jwt_payload } from '@bivajon/common';
import { jwtSign } from 'src/utils/jwt';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) { }

  async create(reqBody: CreateAdminDto) {

    const isExist = await this.repo.findOneBy({ email: reqBody.email });
    if (isExist) {
      throw new NotFoundException('Admin already exist');
    }

    const user = this.repo.create({ ...reqBody });

    return this.repo.save(user);
  }

  async signIn(reqBody: AdminSignInDto) {

    const admin = await this.repo.findOneBy({ email: reqBody.email });
    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const userPaylod: jwt_payload = {
      id: admin.id,
      role: auth_role.admin
    }

    const jwtToken = await jwtSign(userPaylod);

    if (!jwtToken) {
      throw new BadRequestException('Invalid admin');
    }

    return {
      ...admin,
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

  async update(id: number, reqBody: UpdateAdminDto) {
    const user = await this.findOne(id);
    Object.assign(user, reqBody);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }

}
