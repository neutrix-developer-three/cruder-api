import { Model, Types } from 'mongoose';
import { PrivacyPolicyPageCms } from './schema/privacy-policy-page-cms.schema';
import { UpdatePrivacyPolicyPageCmsDto } from './dto/update-privacy-policy-page-cms.dto';

export class PrivacyPolicyPageCmsRepository<PrivacyPolicyPageCmsDocument extends PrivacyPolicyPageCms> {
    constructor(private readonly model: Model<PrivacyPolicyPageCmsDocument>) { }

    async createEntity(data: UpdatePrivacyPolicyPageCmsDto): Promise<PrivacyPolicyPageCmsDocument> {
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

    async findOneEntity(): Promise<PrivacyPolicyPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdatePrivacyPolicyPageCmsDto): Promise<PrivacyPolicyPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<PrivacyPolicyPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}