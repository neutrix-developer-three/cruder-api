import mongoose, { Model, Types } from 'mongoose';
import { ShippingAddress } from './schema/shipping-address.schema';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';

export class ShippingAddressRepository<ShippingAddressDocument extends ShippingAddress> {
    constructor(private readonly model: Model<ShippingAddressDocument>) { }

    async createEntity(data: CreateShippingAddressDto): Promise<ShippingAddress> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ShippingAddress | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async findAll(): Promise<ShippingAddress[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ShippingAddress | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
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


}