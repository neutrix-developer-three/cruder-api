import { Model, Types } from 'mongoose';
import { UpdateHomeAboutCmsDto } from './dto/update-home-about-cms.dto';
import { HomeAboutCms } from './schema/home-about-cms.schema';

export class HomeAboutCmsRepository<HomeAboutCmsDocument extends HomeAboutCms> {
    constructor(private readonly model: Model<HomeAboutCmsDocument>) { }

    async createEntity(data: UpdateHomeAboutCmsDto): Promise<HomeAboutCmsDocument> {
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

    async findOneEntity(): Promise<HomeAboutCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHomeAboutCmsDto): Promise<HomeAboutCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HomeAboutCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}