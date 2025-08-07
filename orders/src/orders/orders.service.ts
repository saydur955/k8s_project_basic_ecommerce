import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from './schemas/products.schema';
import { Order } from './schemas/orders.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: ProductModel,
  ) { }


  async getOrderDetails(orderId: Types.ObjectId, userId: number) {

    const order = await this.orderModel
      .findOne({ _id: orderId, userId })
      .populate({
        path: 'items.productId',
        select: 'name price image', // Only include these fields from Product
        model: 'Product' // Specify the model to use

      })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    const productList = order.items.map((item: any) => ({
      ...item.toObject(),
      productId: undefined,
      product: item.productId
    }));


    const orderTransformed = {
      ...order.toObject(),
      items: productList
    }


    return orderTransformed;
  }

  async create(createOrderDto: CreateOrderDto, userId: number) {

    // Validate products exist and calculate total price
    const { items, orderTotal } = await this.validateAndCalculateOrder(createOrderDto.items);


    const order = new this.orderModel({
      items,
      userId,
      totalPrice: orderTotal,
      status: 'pending',
      totalPaid: 0,
    });

    return order.save();

  }

  private async validateAndCalculateOrder(items: CreateOrderDto['items']) {

    const productIds = [...new Set(items.map(item => item.productId.toString()))];

    if (productIds.length !== items.length) {
      throw new BadRequestException('Invalid order format');
    }

    // Find all unique products at once
    const products = await this.productModel.find({
      _id: { $in: productIds },
    }).lean().exec();

    if (products.length !== productIds.length) {
      const foundIds = products.map(p => p._id.toString());
      const missingIds = productIds.filter(id => !foundIds.includes(id.toString()));
      throw new BadRequestException(
        `Products not found: ${missingIds.join(', ')}`
      );
    }

    // Create a map for quick lookup
    const productMap = new Map(
      products.map(product => [product._id.toString(), product])
    );

    // Process items and calculate total
    let orderTotal = 0;

    const processedItems = items.map(item => {
      const product = productMap.get(item.productId.toString());
      if (!product) {
        // This should theoretically never happen due to the check above
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      const itemTotalPrice = product.price * item.quantity;
      orderTotal += itemTotalPrice;

      return {
        productId: product._id,
        quantity: item.quantity,
        totalPrice: itemTotalPrice, // Store individual item total
      };

    });

    return {
      items: processedItems,
      orderTotal,
    };

  }

}
