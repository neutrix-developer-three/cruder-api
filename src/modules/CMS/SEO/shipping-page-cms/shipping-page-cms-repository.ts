import { Model, Types } from 'mongoose';
import { UpdateShippingPageCmsDto } from './dto/update-shipping-page-cms.dto';
import { ShippingPageCms } from './schema/shipping-page-cms.schema';

export class ShippingPageCmsRepository<ShippingPageCmsDocument extends ShippingPageCms> {
    constructor(private readonly model: Model<ShippingPageCmsDocument>) { }

    async createEntity(data: UpdateShippingPageCmsDto): Promise<ShippingPageCmsDocument> {
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

    async findOneEntity(): Promise<ShippingPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateShippingPageCmsDto): Promise<ShippingPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ShippingPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}