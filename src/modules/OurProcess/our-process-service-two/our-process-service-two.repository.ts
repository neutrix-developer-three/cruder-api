import mongoose, { Model, Types } from 'mongoose';
import { OurProcessServiceTwo } from './schema/our-process-service-two.schema';
import { CreateOurProcessServiceTwoDto } from './dto/create-our-process-service-two.dto';
import { UpdateOurProcessServiceTwoDto } from './dto/update-our-process-service-two.dto';

export class OurProcessServiceTwoRepository<OurProcessServiceTwoDocument extends OurProcessServiceTwo> {
    constructor(private readonly model: Model<OurProcessServiceTwoDocument>) { }

    async createEntity(data: CreateOurProcessServiceTwoDto): Promise<OurProcessServiceTwo> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<OurProcessServiceTwo | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateOurProcessServiceTwoDto): Promise<OurProcessServiceTwo | null> {
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

    async findAll(): Promise<OurProcessServiceTwo[]> {
        return await this.model.find({ isDeleted: false });
    }

}