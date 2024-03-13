import { Model, Types } from 'mongoose';
import { ProductComponentUiCms } from './schema/product-component-ui-cms.schema';
import { UpdateProductComponentUiCmsDto } from './dto/update-product-component-ui-cms.dto';

export class ProductComponentUiCmsRepository<ProductComponentUiCmsDocument extends ProductComponentUiCms> {
    constructor(private readonly model: Model<ProductComponentUiCmsDocument>) { }

    async createEntity(data: UpdateProductComponentUiCmsDto): Promise<ProductComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<ProductComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateProductComponentUiCmsDto): Promise<ProductComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ProductComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}