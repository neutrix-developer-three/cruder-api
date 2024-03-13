import mongoose, { Model, Types } from 'mongoose';
import { UpdateAboutPageBannerCMSDto } from './dto/update-about-page-banner-cms.dto';
import { AboutPageBannerCMS } from './schema/about-page-banner-cms.schema';

export class AboutPageBannerCMSRepository<AboutPageBannerCMSDocument extends AboutPageBannerCMS> {
    constructor(private readonly model: Model<AboutPageBannerCMSDocument>) { }

    async createEntity(data: UpdateAboutPageBannerCMSDto): Promise<AboutPageBannerCMSDocument> {
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

    async findOneEntity(id: string): Promise<AboutPageBannerCMSDocument | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateAboutPageBannerCMSDto): Promise<AboutPageBannerCMSDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async deleteEntity(id: string): Promise<boolean> {
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<AboutPageBannerCMSDocument[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<AboutPageBannerCMSDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

    async findByFilterQuery(query: any): Promise<AboutPageBannerCMSDocument[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }
}