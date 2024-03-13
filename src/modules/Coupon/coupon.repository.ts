import mongoose, { Model, Types } from 'mongoose';
import { Coupon } from './schema/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { FilterDto } from 'src/core/filter.dto';


export class CouponRepository<CouponDocument extends Coupon> {
    constructor(private readonly model: Model<CouponDocument>) { }

    async createEntity(data: CreateCouponDto): Promise<Coupon> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Coupon | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('category');
    }


    async updateEntity(id: string, data: UpdateCouponDto): Promise<Coupon | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,couponName: { $regex: searchKeyword, $options: 'i' }}
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
            .sort({ createdAt: -1 }).populate('category');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
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

    async findAll(): Promise<Coupon[]> {
        return await this.model.find({ isDeleted: false });
    }


    async findAllByFilterQuery(query: any): Promise<Coupon[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }

    async findOneByFilterQuery(query: any): Promise<Coupon | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

}