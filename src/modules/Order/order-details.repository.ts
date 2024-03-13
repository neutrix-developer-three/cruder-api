import mongoose, { Model, Types } from 'mongoose';
import { OrderDetails } from './schema/order-details.schema';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { UpdateOrderDetailsDto } from './dto/update-order-details.dto';

export class OrderDetailsRepository<OrderDetailsDocument extends OrderDetails> {
  constructor(private readonly model: Model<OrderDetailsDocument>) {}

  async createEntity(data: CreateOrderDetailsDto): Promise<OrderDetails> {
    const createdEntity = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });
    return await createdEntity.save();
  }

  async findOneEntity(id: string): Promise<OrderDetails | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await this.model.findOne({ _id: id, isDeleted: false });
  }

  async updateEntity(
    id: string,
    data: UpdateOrderDetailsDto,
  ): Promise<OrderDetails | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async updateEntityByFilter(
    where,
    data: UpdateOrderDetailsDto,
  ): Promise<OrderDetails | null> {
    return await this.model.findOneAndUpdate(where, data, { new: true });
  }

  async findOneByFilterQuery(query: any): Promise<OrderDetails | null> {
    return await this.model.findOne({ ...query, isDeleted: false }).lean();
  }

  async findAll(): Promise<OrderDetails[]> {
    return await this.model.find({ isDeleted: false });
  }

  async findAllByFilterQuery(query: any): Promise<OrderDetails[] | null> {
    return await this.model.find({ ...query, isDeleted: false }).lean();
  }

  async deleteEntity(id: string): Promise<boolean> {
    const data = await this.model.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (data) return true;
    return false;
  }

  async getOrdersWithReturn(query?: any): Promise<OrderDetails[]> {
    const orders = await this.model
      .aggregate([
        {
          $match: {
            ...query,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'product_returns',
            let: { orderId: '$orderId', productId: '$productId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$orderId', '$$orderId'] }, // Matching on orderId
                      { $eq: ['$productId', '$$productId'] }, // Matching on productId
                      { $eq: ['$isDeleted', false] },
                    ],
                  },
                },
              },
            ],
            as: 'returnInfo',
          },
        },
        {
          $unwind: {
            path: '$returnInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .exec();

    return orders;
  }
  async findAllByFilterProfitReportData(
    query?: any
  ): Promise<OrderDetails[]> {
    const orders = await this.model
      .aggregate([
        {
          $match: {
            ...query,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'products',
            let: { productId: { $toObjectId: '$productId' } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$productId'] },
                      { $eq: ['$isDeleted', false] },
                    ],
                  },
                },
              },
            ],
            as: 'productInfo',
          },
        },
        {
          $unwind: {
            path: '$productInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'billing_addresses',
            let: { orderId: '$orderId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$orderId', '$$orderId'] }, // Matching on orderId
                      { $eq: ['$isDeleted', false] },
                    ],
                  },
                },
              },
            ],
            as: 'billingInfo',
          },
        },
        {
          $unwind: {
            path: '$billingInfo',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            cost: { $ifNull: ['$productInfo.cost', 0] },
            price_total: {
              $multiply: [{ $ifNull: ['$price', 0] }, '$quantity'],
            },
            cost_total: {
              $multiply: [{ $ifNull: ['$productInfo.cost', 0] }, '$quantity'],
            },
            profit: {
              $subtract: [
                { $multiply: [{ $ifNull: ['$price', 0] }, '$quantity'] },
                {
                  $multiply: [
                    { $ifNull: ['$productInfo.cost', 0] },
                    '$quantity',
                  ],
                },
              ],
            },
          },
        },
      ])
      .exec();

    return orders;
  }
}
