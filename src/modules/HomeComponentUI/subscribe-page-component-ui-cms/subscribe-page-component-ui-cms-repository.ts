import { Model, Types } from 'mongoose';
import { SubscribePageComponentUiCms } from './schema/subscribe-page-component-ui-cms.schema';
import { UpdateSubscribePageComponentUiCmsDto } from './dto/update-subscribe-page-component-ui-cms.dto';

export class SubscribePageComponentUiCmsRepository<SubscribePageComponentUiCmsDocument extends SubscribePageComponentUiCms> {
    constructor(private readonly model: Model<SubscribePageComponentUiCmsDocument>) { }

    async createEntity(data: UpdateSubscribePageComponentUiCmsDto): Promise<SubscribePageComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<SubscribePageComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateSubscribePageComponentUiCmsDto): Promise<SubscribePageComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<SubscribePageComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}