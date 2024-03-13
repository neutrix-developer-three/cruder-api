import { Model, Types } from 'mongoose';
import { HomePageUiCms } from './schema/home-page-ui-cms.schema';
import { UpdateHomePageUiCmsDto } from './dto/update-home-page-ui-cms.dto';

export class HomePageUiCmsRepository<HomePageUiCmsDocument extends HomePageUiCms> {
    constructor(private readonly model: Model<HomePageUiCmsDocument>) { }

    async createEntity(data: UpdateHomePageUiCmsDto): Promise<HomePageUiCmsDocument> {
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

    async findOneEntity(): Promise<HomePageUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHomePageUiCmsDto): Promise<HomePageUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HomePageUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}