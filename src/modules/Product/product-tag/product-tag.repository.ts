import mongoose, { Model, Types } from 'mongoose';
import { ProductTag } from './schema/product-tag.schema';
import { CreateProductTagDto } from './dto/create-product-tag.dto';
import { UpdateProductTagDto } from './dto/update-product-tag.dto';

export class ProductTagRepository<ProductTagDocument extends ProductTag> {
    constructor(private readonly model: Model<ProductTagDocument>) { }

    async createEntity(data: CreateProductTagDto): Promise<ProductTag> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductTag | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateProductTagDto): Promise<ProductTag | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(page: number, limit: number, query?: any) {
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments({
            ...query,
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }

    async findAllProductTagByIds(ProductTagIds:string[]): Promise<ProductTag[]> {
        return await this.model.find({_id: { $in: ProductTagIds }, isDeleted: false }).lean();
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

    async findAll(): Promise<ProductTag[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ProductTag | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
   

}