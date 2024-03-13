import mongoose, { Model, Types } from 'mongoose';
import { ShippingCms } from './schema/shipping-cms.schema';
import { UpdateShippingCmsDto } from './dto/update-shipping-cms.dto';

export class ShippingCmsRepository<ShippingCmsDocument extends ShippingCms> {
    constructor(private readonly model: Model<ShippingCmsDocument>) { }

    async createEntity(data: UpdateShippingCmsDto): Promise<ShippingCmsDocument> {
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

    async findOneEntity(): Promise<ShippingCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateShippingCmsDto): Promise<ShippingCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findAll(): Promise<ShippingCmsDocument[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ShippingCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}