import mongoose, { Model, Types } from 'mongoose';
import { ProductFaq } from './schema/product-faq.schema';
import { CreateProductFaqDto } from './dto/create-product-faq.dto';
import { UpdateProductFaqDto } from './dto/update-product-faq.dto';

export class ProductFaqRepository<ProductFaqDocument extends ProductFaq> {
    constructor(private readonly model: Model<ProductFaqDocument>) { }

    async createEntity(data: CreateProductFaqDto): Promise<ProductFaq> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductFaq | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateProductFaqDto): Promise<ProductFaq | null> {
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
            .sort({ createdAt: -1 }).populate('product');

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

    async findAll(): Promise<ProductFaq[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ProductFaq | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
   

}