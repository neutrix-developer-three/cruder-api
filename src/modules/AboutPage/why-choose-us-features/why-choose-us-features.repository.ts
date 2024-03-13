import mongoose, { Model, Types } from 'mongoose';
import { CreateWhyChooseUsFeaturesDto } from './dto/create-why-choose-us-features.dto';
import { UpdateWhyChooseUsFeaturesDto } from './dto/update-why-choose-us-features.dto';
import { WhyChooseUsFeatures } from './schema/why-choose-us-features.schema';


export class WhyChooseUsFeaturesRepository<WhyChooseUsFeaturesDocument extends WhyChooseUsFeatures> {
    constructor(private readonly model: Model<WhyChooseUsFeaturesDocument>) { }

    async createEntity(data: CreateWhyChooseUsFeaturesDto): Promise<WhyChooseUsFeatures> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<WhyChooseUsFeatures | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateWhyChooseUsFeaturesDto): Promise<WhyChooseUsFeatures | null> {
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

    async findAll(): Promise<WhyChooseUsFeatures[]> {
        return await this.model.find({ isDeleted: false });
    }

}