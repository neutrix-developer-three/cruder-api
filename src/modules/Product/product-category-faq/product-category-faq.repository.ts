import mongoose, { Model, Types } from 'mongoose';
import { ProductCategoryFaq } from './schema/product-category-faq.schema';
import { CreateProductCategoryFaqDto } from './dto/create-product-category-faq.dto';
import { UpdateProductCategoryFaqDto } from './dto/update-product-category-faq.dto';

export class ProductCategoryFaqRepository<ProductCategoryFaqDocument extends ProductCategoryFaq> {
    constructor(private readonly model: Model<ProductCategoryFaqDocument>) { }

    async createEntity(data: CreateProductCategoryFaqDto): Promise<ProductCategoryFaq> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductCategoryFaq | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateProductCategoryFaqDto): Promise<ProductCategoryFaq | null> {
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
            .sort({ createdAt: -1 }).populate('category');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
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

    async findAll(): Promise<ProductCategoryFaq[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ProductCategoryFaq | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
   

}