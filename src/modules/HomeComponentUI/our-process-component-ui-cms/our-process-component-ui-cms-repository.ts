import { Model, Types } from 'mongoose';
import { OurProcessComponentUiCms } from './schema/our-process-component-ui-cms.schema';
import { UpdateOurProcessComponentUiCmsDto } from './dto/update-our-process-component-ui-cms.dto';

export class OurProcessComponentUiCmsRepository<OurProcessComponentUiCmsDocument extends OurProcessComponentUiCms> {
    constructor(private readonly model: Model<OurProcessComponentUiCmsDocument>) { }

    async createEntity(data: UpdateOurProcessComponentUiCmsDto): Promise<OurProcessComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<OurProcessComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateOurProcessComponentUiCmsDto): Promise<OurProcessComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<OurProcessComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}