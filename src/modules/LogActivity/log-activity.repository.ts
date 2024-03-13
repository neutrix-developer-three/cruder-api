import mongoose, { Model, Types } from 'mongoose';
import { LogActivity } from './schema/log-activity.schema';
import { CreateLogActivityDto } from './dto/create-log-activity.dto';
import { LogFilterDto } from './dto/log-filter.dto';

export class LogActivityRepository<LogActivityDocument extends LogActivity> {
  constructor(private readonly model: Model<LogActivityDocument>) {}

  async createEntity(data: CreateLogActivityDto): Promise<LogActivity> {
    const createdEntity = new this.model({
      ...data,
      _id: new Types.ObjectId(),
    });
    return await createdEntity.save();
  }

  async findOneEntity(id: string): Promise<LogActivity | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await this.model.findOne({ _id: id, isDeleted: false });
  }

  async paginate(filterDto: LogFilterDto, query?: any) {
    const {
      page: pageParam,
      limit: limitParam,
      searchKeyword,
      startDate,
      endDate,
      userId,
    } = filterDto;
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    let skip = (page - 1) * limit;
    if (searchKeyword) {
      skip=0;
      query = { ...query, subject: { $regex: searchKeyword, $options: 'i' } };
    }
    if (userId) {
      query = { ...query, user_id: userId };
    }
    if (startDate && endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lt: new Date(`${endDate}T23:59:59Z`),
        },
      };
    } else {
      if (startDate) {
        query = {
          ...query,
          createdAt: {
            $gte: new Date(`${startDate}T00:00:00Z`),
          },
        };
      }
      if (endDate) {
        query = {
          ...query,
          createdAt: {
            $lt: new Date(`${endDate}T23:59:59Z`),
          },
        };
      }
    }
    const total = await this.model.countDocuments({
      ...query,
      isDeleted: false,
    });
    const pageCount = Math.ceil(total / limit);

    const data = await this.model
      .find({ ...query, isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return {
      data: data,
      pageCount: pageCount,
      total: total,
    };
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

  async findAll(): Promise<LogActivity[]> {
    return await this.model.find({ isDeleted: false }).sort({ createdAt: -1 });
  }

  async findOneByFilterQuery(query: any): Promise<LogActivity | null> {
    return await this.model.findOne({ ...query, isDeleted: false }).lean();
  }
}
