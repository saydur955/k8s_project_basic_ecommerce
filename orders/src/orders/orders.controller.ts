import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { auth_role, AuthGuard, CurrentUser, jwt_payload, MongoIdDTO, Roles } from '@bivajon/common';

@Controller('orders')
export class OrdersController {

  constructor(private service: OrdersService){}


  @UseGuards(AuthGuard)
  @Roles([auth_role.user])
  @Post()
  create(@Body() reqBody: CreateOrderDto, @CurrentUser() user: jwt_payload) {
    return this.service.create(reqBody, user.id);
  }

  @UseGuards(AuthGuard)
  @Roles([auth_role.user])
  @Get(':id')
  getOne(@Param() param: MongoIdDTO, @CurrentUser() user: jwt_payload) {
    return this.service.getOrderDetails(param.id, user.id);
  }

}
