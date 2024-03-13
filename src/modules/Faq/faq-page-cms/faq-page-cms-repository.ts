import { Model, Types } from 'mongoose';
import { UpdateFaqPageCmsDto } from './dto/update-faq-page-cms.dto';
import { FaqPageCms } from './schema/faq-page-cms.schema';

export class FaqPageCmsRepository<FaqPageCmsDocument extends FaqPageCms> {
    constructor(private readonly model: Model<FaqPageCmsDocument>) { }

    async createEntity(data: UpdateFaqPageCmsDto): Promise<FaqPageCmsDocument> {
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

    async findOneEntity(): Promise<FaqPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateFaqPageCmsDto): Promise<FaqPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<FaqPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}