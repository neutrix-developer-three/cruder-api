import { Model, Types } from 'mongoose';
import { ProductDetailsComponentUiCms } from './schema/product-details-component-ui-cms.schema';
import { UpdateProductDetailsComponentUiCmsDto } from './dto/update-product-details-component-ui-cms.dto';

export class ProductDetailsComponentUiCmsRepository<ProductDetailsComponentUiCmsDocument extends ProductDetailsComponentUiCms> {
    constructor(private readonly model: Model<ProductDetailsComponentUiCmsDocument>) { }

    async createEntity(data: UpdateProductDetailsComponentUiCmsDto): Promise<ProductDetailsComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<ProductDetailsComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProductDetailsComponentUiCmsDto): Promise<ProductDetailsComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ProductDetailsComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}