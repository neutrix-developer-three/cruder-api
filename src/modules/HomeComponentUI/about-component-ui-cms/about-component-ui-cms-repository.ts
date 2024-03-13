import { Model, Types } from 'mongoose';
import { AboutComponentUiCms } from './schema/about-component-ui-cms.schema';
import { UpdateAboutComponentUiCmsDto } from './dto/update-about-component-ui-cms.dto';

export class AboutComponentUiCmsRepository<AboutComponentUiCmsDocument extends AboutComponentUiCms> {
    constructor(private readonly model: Model<AboutComponentUiCmsDocument>) { }

    async createEntity(data: UpdateAboutComponentUiCmsDto): Promise<AboutComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<AboutComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateAboutComponentUiCmsDto): Promise<AboutComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<AboutComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}