import { Model, Types } from 'mongoose';
import { OurProcessPageCms } from './schema/our-process-page-cms.schema';
import { UpdateOurProcessPageCmsDto } from './dto/update-our-process-page-cms.dto';

export class OurProcessPageCmsRepository<OurProcessPageCmsDocument extends OurProcessPageCms> {
    constructor(private readonly model: Model<OurProcessPageCmsDocument>) { }

    async createEntity(data: UpdateOurProcessPageCmsDto): Promise<OurProcessPageCmsDocument> {
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

    async findOneEntity(): Promise<OurProcessPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateOurProcessPageCmsDto): Promise<OurProcessPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<OurProcessPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}