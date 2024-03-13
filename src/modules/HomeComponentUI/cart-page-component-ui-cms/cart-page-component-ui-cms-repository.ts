import { Model, Types } from 'mongoose';
import { CartPageComponentUiCms } from './schema/cart-page-component-ui-cms.schema';
import { UpdateCartPageComponentUiCmsDto } from './dto/update-cart-page-component-ui-cms.dto';

export class CartPageComponentUiCmsRepository<CartPageComponentUiCmsDocument extends CartPageComponentUiCms> {
    constructor(private readonly model: Model<CartPageComponentUiCmsDocument>) { }

    async createEntity(data: UpdateCartPageComponentUiCmsDto): Promise<CartPageComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<CartPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateCartPageComponentUiCmsDto): Promise<CartPageComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<CartPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}