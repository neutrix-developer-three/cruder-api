import { Model, Types } from 'mongoose';
import { HomeEchoCms } from './schema/home-echo-cms.schema';
import { UpdateHomeEchoCmsDto } from './dto/update-home-echo-cms.dto';

export class HomeEchoCmsRepository<HomeEchoCmsDocument extends HomeEchoCms> {
    constructor(private readonly model: Model<HomeEchoCmsDocument>) { }

    async createEntity(data: UpdateHomeEchoCmsDto): Promise<HomeEchoCmsDocument> {
        try {
            const createdEntity = new this.model({
                ...data,
                _id: new Types.ObjectId()
            });
            return await createdEntity.save();
        } catch (err) {
            console.log(err);
        }
    }

    async findOneEntity(): Promise<HomeEchoCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHomeEchoCmsDto): Promise<HomeEchoCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HomeEchoCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}