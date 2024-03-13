import mongoose, { Model, Types } from 'mongoose';
import { UpdateTermsConditionsCmsDto } from './dto/update-terms-conditions-cms.dto';
import { TermsConditionsCms } from './schema/terms-conditions-cms.schema';

export class TermsConditionsCmsRepository<TermsConditionsCmsDocument extends TermsConditionsCms> {
    constructor(private readonly model: Model<TermsConditionsCmsDocument>) { }

    async createEntity(data: UpdateTermsConditionsCmsDto): Promise<TermsConditionsCmsDocument> {
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

    async findOneEntity(): Promise<TermsConditionsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateTermsConditionsCmsDto): Promise<TermsConditionsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<TermsConditionsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}