import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard, CurrentUser, jwt_payload, PgIdDTO } from '@bivajon/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSignInDto } from './dto/signin-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateAdminDto) {
    return this.adminService.create(createUserDto);
  }

  @Post('signin')
  signin(@Body() body: AdminSignInDto) {
    return this.adminService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('myAccount')
  getMe(@CurrentUser() admin: jwt_payload) {
    return {
      msg: 'My Account',
      admin
    }
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: PgIdDTO) {
    return this.adminService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param() param: PgIdDTO, @Body() updateUserDto: UpdateAdminDto) {
    return this.adminService.update(param.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() param: PgIdDTO) {
    return this.adminService.remove(param.id);
  }

}
