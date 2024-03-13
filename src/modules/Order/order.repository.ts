import mongoose, { Model, Types } from 'mongoose';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterDto } from 'src/core/filter.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

export class OrderRepository<OrderDocument extends Order> {
    constructor(private readonly model: Model<OrderDocument>) { }

    async createEntity(data: CreateOrderDto): Promise<Order> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async updateEntity(id: string, data: UpdateOrderDto): Promise<Order | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async updateEntityByFilter(where, data: UpdateOrderDto): Promise<Order | null> {
        return await this.model.findOneAndUpdate(where, data, { new: true });
    }

    async findOneEntity(id: string): Promise<Order | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,orderId: { $regex: searchKeyword, $options: 'i' }}
        }
        const total = await this.model.countDocuments({
            ...query,
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        // const data = await this.model
        //     .find({ ...query, isDeleted: false })
        //     .skip(skip)
        //     .limit(limit)
        //     .sort({ createdAt: -1 }).lean();
        const data = await this.model
            .aggregate([
            {
              $match: {
                ...query,
                isDeleted: false
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
                $sort: {
                    createdAt: -1, // Sorting createdAt in descending order
                }
            }
          ])
          .skip(skip)
          .limit(limit)
          .exec();

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }
    async paginateBk(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,orderId: { $regex: searchKeyword, $options: 'i' }}
        }
        const total = await this.model.countDocuments({
            ...query,
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).lean();

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }

    async findAll(): Promise<Order[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findLastEntity(): Promise<Order | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ createdAt: -1 });
    }

    async findOneByFilterQuery(query: any): Promise<Order | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

    async findOneOrderByFilterQuery(orderNumber:string, userId:string): Promise<Order | null> {
        return await this.model.findOne({ isDeleted: false,customerId:userId,$or: [{ orderId: orderNumber }, { trackingNumber: orderNumber }] }).lean();
    }

    async findUserDashboardPageOrder(query: any): Promise<Order[]> {
        return await this.model
        .find({...query,isDeleted: false })
        .skip(0)
        .limit(10)
        .sort({ createdAt: -1 }).lean();
    }

    async findAllByFilter(query: any): Promise<Order[]> {
        return await this.model.find({ ...query,isDeleted: false }).sort({ createdAt: -1 }).lean();
    }

    async findAllSalesReportFilter(query: any): Promise<Order[]> {
      const orders = await this.model
        .aggregate([
        {
          $match: {
            ...query,
            isDeleted: false
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
            $sort: {
                createdAt: -1, // Sorting createdAt in descending order
            }
        }
      ])
      .exec();
      return orders;
    }

    async countAllUserOrder(query: any){
        const total = await this.model.countDocuments({
           ...query,
            isDeleted: false
        });
        return total;
    }

    async findAdminDashboardPageOrder(query?: any): Promise<Order[]> {
        const orders = await this.model
        .aggregate([
        {
          $match: {
            ...query,
            isDeleted: false
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
            $sort: {
                createdAt: -1, // Sorting createdAt in descending order
            }
        }
      ])
      .skip(0)
      .limit(50)
      .exec();

      return orders;
    }
    async findAdminDashboardPageOrderBk(query?: any): Promise<Order[]> {
        return await this.model
        .find({...query,isDeleted: false })
        .skip(0)
        .limit(50)
        .sort({ createdAt: -1 }).lean();
    }

    async findAdminTodayOrderBk(orderData:string): Promise<Order[]> {
        return await this.model
        .find({
            isDeleted: false,
            createdAt: {
              $gte: new Date(`${orderData}T00:00:00Z`),
              $lt: new Date(`${orderData}T23:59:59Z`),
            },
          })
        .skip(0)
        .limit(50)
        .sort({ createdAt: -1 }).lean();
    }
    async findAdminTodayOrder(orderData:string): Promise<Order[]> {
        const orders = await this.model
        .aggregate([
        {
          $match: {
            isDeleted: false,
            createdAt: {
                $gte: new Date(`${orderData}T00:00:00Z`),
                $lt: new Date(`${orderData}T23:59:59Z`),
              }
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
            $sort: {
                createdAt: -1, // Sorting createdAt in descending order
            }
        }
      ])
      .skip(0)
      .limit(50)
      .exec();

      return orders;
    }

    async findByDateSaleData(saleDate:string): Promise<Order[]> {
      const orders = await this.model
        .aggregate([
        {
          $match: {
            isDeleted: false,
            createdAt: {
              $gte: new Date(`${saleDate}T00:00:00Z`),
              $lt: new Date(`${saleDate}T23:59:59Z`),
            }
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
            $sort: {
                createdAt: -1, // Sorting createdAt in descending order
            }
        }
      ])
      .exec();
      return orders;
    }

    async findByDateSaleDataBk(saleDate:string): Promise<Order[]> {
      return await this.model
      .find({
          isDeleted: false,
          createdAt: {
            $gte: new Date(`${saleDate}T00:00:00Z`),
            $lt: new Date(`${saleDate}T23:59:59Z`),
          },
        })
      .sort({ createdAt: -1 }).lean();
  }

    async countTotalOrder(query?: any){
        const total = await this.model.countDocuments({
           ...query,
            isDeleted: false
        });
        return total;
    }

    async countTodayTotalOrder(orderData:string, query?: any){
        const total = await this.model.countDocuments({
            ...query,
            isDeleted: false,
            createdAt: {
              $gte: new Date(`${orderData}T00:00:00Z`),
              $lt: new Date(`${orderData}T23:59:59Z`),
            },
          });
        return total;
    }

    async findOnePopulateQuery(query: any): Promise<any | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).populate('user').lean();
    }


    async deleteEntity(id: string): Promise<boolean> {
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }







}