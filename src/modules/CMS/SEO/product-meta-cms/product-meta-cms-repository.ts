import { Model, Types } from 'mongoose';
import { ProductMetaCms } from './schema/product-meta-cms.schema';
import { UpdateProductMetaCmsDto } from './dto/update-product-meta-cms.dto';

export class ProductMetaCmsRepository<ProductMetaCmsDocument extends ProductMetaCms> {
    constructor(private readonly model: Model<ProductMetaCmsDocument>) { }

    async createEntity(data: UpdateProductMetaCmsDto): Promise<ProductMetaCmsDocument> {
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

    async findOneEntity(): Promise<ProductMetaCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProductMetaCmsDto): Promise<ProductMetaCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ProductMetaCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}