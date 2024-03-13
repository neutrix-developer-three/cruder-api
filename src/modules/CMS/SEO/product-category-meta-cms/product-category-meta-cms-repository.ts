import { Model, Types } from 'mongoose';
import { ProductCategoryMetaCms } from './schema/product-category-meta-cms.schema';
import { UpdateProductCategoryMetaCmsDto } from './dto/update-product-category-meta-cms.dto';

export class ProductCategoryMetaCmsRepository<ProductCategoryMetaCmsDocument extends ProductCategoryMetaCms> {
    constructor(private readonly model: Model<ProductCategoryMetaCmsDocument>) { }

    async createEntity(data: UpdateProductCategoryMetaCmsDto): Promise<ProductCategoryMetaCmsDocument> {
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

    async findOneEntity(): Promise<ProductCategoryMetaCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProductCategoryMetaCmsDto): Promise<ProductCategoryMetaCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ProductCategoryMetaCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}