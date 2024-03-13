import { Model, Types } from 'mongoose';
import { ProductPageCms } from './schema/product-page-cms.schema';
import { UpdateProductPageCmsDto } from './dto/update-product-page-cms.dto';

export class ProductPageCmsRepository<ProductPageCmsDocument extends ProductPageCms> {
    constructor(private readonly model: Model<ProductPageCmsDocument>) { }

    async createEntity(data: UpdateProductPageCmsDto): Promise<ProductPageCmsDocument> {
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

    async findOneEntity(): Promise<ProductPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProductPageCmsDto): Promise<ProductPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ProductPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}