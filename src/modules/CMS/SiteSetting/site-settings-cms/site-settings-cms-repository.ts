import mongoose, { Model, Types } from 'mongoose';
import { SiteSettingsCms } from './schema/site-settings-cms.schema';
import { UpdateSiteSettingsCmDto } from './dto/update-site-settings-cms.dto';

export class SiteSettingsCmsRepository<SiteSettingsCmsDocument extends SiteSettingsCms> {
    constructor(private readonly model: Model<SiteSettingsCmsDocument>) { }

    async createEntity(data: UpdateSiteSettingsCmDto): Promise<SiteSettingsCmsDocument> {
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

    async findOneEntity(): Promise<SiteSettingsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateSiteSettingsCmDto): Promise<SiteSettingsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<SiteSettingsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}