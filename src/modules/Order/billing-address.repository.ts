import mongoose, { Model, Types } from 'mongoose';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { BillingAddress } from './schema/billing-address.schema';

export class BillingAddressRepository<BillingAddressDocument extends BillingAddress> {
    constructor(private readonly model: Model<BillingAddressDocument>) { }

    async createEntity(data: CreateBillingAddressDto): Promise<BillingAddress> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<BillingAddress | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async findAll(): Promise<BillingAddress[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<BillingAddress | null> {
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