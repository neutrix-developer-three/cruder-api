import { Model, Types } from 'mongoose';
import { UpdateTermsConditionPageCmsDto } from './dto/update-terms-condition-page-cms.dto';
import { TermsConditionPageCms } from './schema/terms-condition-page-cms.schema';

export class TermsConditionPageCmsRepository<TermsConditionPageCmsDocument extends TermsConditionPageCms> {
    constructor(private readonly model: Model<TermsConditionPageCmsDocument>) { }

    async createEntity(data: UpdateTermsConditionPageCmsDto): Promise<TermsConditionPageCmsDocument> {
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

    async findOneEntity(): Promise<TermsConditionPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateTermsConditionPageCmsDto): Promise<TermsConditionPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<TermsConditionPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}