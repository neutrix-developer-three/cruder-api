import mongoose, { Model, Types } from 'mongoose';
import { PrivacyPolicyCms } from './schema/privacy-policy-cms.schema';
import { UpdatePrivacyPolicyCmsDto } from './dto/update-privacy-policy-cms.dto';

export class PrivacyPolicyCmsRepository<PrivacyPolicyCmsDocument extends PrivacyPolicyCms> {
    constructor(private readonly model: Model<PrivacyPolicyCmsDocument>) { }

    async createEntity(data: UpdatePrivacyPolicyCmsDto): Promise<PrivacyPolicyCmsDocument> {
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

    async findOneEntity(): Promise<PrivacyPolicyCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdatePrivacyPolicyCmsDto): Promise<PrivacyPolicyCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<PrivacyPolicyCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}