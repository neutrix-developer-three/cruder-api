import { Model, Types } from 'mongoose';
import { ReturnPageCms } from './schema/return-page-cms.schema';
import { UpdateReturnPageCmsDto } from './dto/update-return-page-cms.dto';

export class ReturnPageCmsRepository<ReturnPageCmsDocument extends ReturnPageCms> {
    constructor(private readonly model: Model<ReturnPageCmsDocument>) { }

    async createEntity(data: UpdateReturnPageCmsDto): Promise<ReturnPageCmsDocument> {
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

    async findOneEntity(): Promise<ReturnPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateReturnPageCmsDto): Promise<ReturnPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ReturnPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}