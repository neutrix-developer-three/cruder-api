import { Model, Types } from 'mongoose';
import { UpdateAboutUsPageCmsDto } from './dto/update-about-us-page-cms.dto';
import { AboutUsPageCms } from './schema/about-us-page-cms.schema';

export class AboutUsPageCmsRepository<AboutUsPageCmsDocument extends AboutUsPageCms> {
    constructor(private readonly model: Model<AboutUsPageCmsDocument>) { }

    async createEntity(data: UpdateAboutUsPageCmsDto): Promise<AboutUsPageCmsDocument> {
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

    async findOneEntity(): Promise<AboutUsPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateAboutUsPageCmsDto): Promise<AboutUsPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<AboutUsPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}