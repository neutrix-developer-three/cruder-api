import mongoose, { Model, Types } from 'mongoose';
import { OurProcessServiceOne } from './schema/our-process-service-one.schema';
import { CreateOurProcessServiceOneDto } from './dto/create-our-process-service-one.dto';
import { UpdateOurProcessServiceOneDto } from './dto/update-our-process-service-one.dto';

export class OurProcessServiceOneRepository<OurProcessServiceOneDocument extends OurProcessServiceOne> {
    constructor(private readonly model: Model<OurProcessServiceOneDocument>) { }

    async createEntity(data: CreateOurProcessServiceOneDto): Promise<OurProcessServiceOne> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<OurProcessServiceOne | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateOurProcessServiceOneDto): Promise<OurProcessServiceOne | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(page: number, limit: number, query?: any) {
        const skip = (page - 1) * limit;
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

    async findAll(): Promise<OurProcessServiceOne[]> {
        return await this.model.find({ isDeleted: false });
    }

}