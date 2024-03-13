import { Model, Types } from 'mongoose';
import { HomePageCms } from './schema/home-page-cms.schema';
import { UpdateHomePageCmsDto } from './dto/update-home-page-cms.dto';


export class HomePageCmsRepository<HomePageCmsDocument extends HomePageCms> {
    constructor(private readonly model: Model<HomePageCmsDocument>) { }

    async createEntity(data: UpdateHomePageCmsDto): Promise<HomePageCmsDocument> {
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

    async findOneEntity(): Promise<HomePageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHomePageCmsDto): Promise<HomePageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HomePageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}