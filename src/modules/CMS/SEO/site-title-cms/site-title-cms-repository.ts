import mongoose, { Model, Types } from 'mongoose';
import { UpdateSiteTitleCmsDto } from './dto/update-site-title-cms.dto';
import { SiteTitleCms } from './schema/site-title-cms.schema';

export class SiteTitleCmsRepository<SiteTitleCmsDocument extends SiteTitleCms> {
    constructor(private readonly model: Model<SiteTitleCmsDocument>) { }

    async createEntity(data: UpdateSiteTitleCmsDto): Promise<SiteTitleCmsDocument> {
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

    async findOneEntity(): Promise<SiteTitleCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateSiteTitleCmsDto): Promise<SiteTitleCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<SiteTitleCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}