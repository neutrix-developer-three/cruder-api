import { Model, Types } from 'mongoose';
import { FaqMetaCms } from './schema/faq-meta-cms.schema';
import { UpdateFaqMetaCmsDto } from './dto/update-faq-meta-cms.dto';

export class FaqMetaCmsRepository<FaqMetaCmsDocument extends FaqMetaCms> {
    constructor(private readonly model: Model<FaqMetaCmsDocument>) { }

    async createEntity(data: UpdateFaqMetaCmsDto): Promise<FaqMetaCmsDocument> {
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

    async findOneEntity(): Promise<FaqMetaCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateFaqMetaCmsDto): Promise<FaqMetaCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<FaqMetaCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}