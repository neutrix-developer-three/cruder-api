import mongoose, { Model, Types } from 'mongoose';
import { CouponLog } from './schema/coupon-log.schema';
import { CreateCouponLogDto } from './dto/create-coupon-log.dto';

export class CouponLogRepository<CouponLogDocument extends CouponLog> {
    constructor(private readonly model: Model<CouponLogDocument>) { }

    async createEntity(data: CreateCouponLogDto): Promise<CouponLog> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<CouponLog | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async findAll(): Promise<CouponLog[]> {
        return await this.model.find({ isDeleted: false });
    }

}