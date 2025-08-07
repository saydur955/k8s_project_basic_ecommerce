import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, CurrentUser, jwt_payload, PgIdDTO } from '@bivajon/common';
import { UserSignInDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  signin(@Body() body: UserSignInDto) {
    return this.usersService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('myAccount')
  getMe(@CurrentUser() user: jwt_payload) {
    return {
      msg: 'My Account',
      user
    }
  }


  @Get(':id')
  findOne(@Param() param: PgIdDTO) {
    return this.usersService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param() param: PgIdDTO, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(param.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() param: PgIdDTO) {
    return this.usersService.remove(param.id);
  }

}
