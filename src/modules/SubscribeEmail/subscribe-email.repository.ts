import mongoose, { Model, Types } from 'mongoose';
import { SubscribeEmail } from './schema/subscribe-email.schema';
import { CreateSubscribeEmailDto } from './dto/create-subscribe-email';
import { UpdateSubscribeEmailDto } from './dto/update-subscribe-email.dto';
import { FilterDto } from 'src/core/filter.dto';


export class SubscribeEmailRepository<SubscribeEmailDocument extends SubscribeEmail> {
    constructor(private readonly model: Model<SubscribeEmailDocument>) { }

    async createEntity(data: CreateSubscribeEmailDto): Promise<SubscribeEmail> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<SubscribeEmail | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateSubscribeEmailDto): Promise<SubscribeEmail | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,email: { $regex: searchKeyword, $options: 'i' }}
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
            .sort({ createdAt: -1 });

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

    async findAll(): Promise<SubscribeEmail[]> {
        return await this.model.find({ isDeleted: false });
    }

}