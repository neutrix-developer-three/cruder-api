import mongoose, { Model, Types } from 'mongoose';
import { UpdateCartCmsDto } from './dto/update-cart-cms.dto';
import { CartCms } from './schema/cart-cms.schema';

export class CartCmsRepository<CartCmsDocument extends CartCms> {
    constructor(private readonly model: Model<CartCmsDocument>) { }

    async createEntity(data: UpdateCartCmsDto): Promise<CartCmsDocument> {
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

    async findOneEntity(): Promise<CartCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateCartCmsDto): Promise<CartCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<CartCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}