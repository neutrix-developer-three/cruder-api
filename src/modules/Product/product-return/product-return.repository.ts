import mongoose, { Model, Types } from 'mongoose';
import { ProductReturn } from './schema/product-return.schema';
import { CreateProductReturnDto } from './dto/create-product-return.dto';
import { UpdateProductReturnDto } from './dto/update-product-return.dto';


export class ProductReturnRepository<ProductCategoryDocument extends ProductReturn> {
    constructor(private readonly model: Model<ProductCategoryDocument>) { }

    async createEntity(data: CreateProductReturnDto): Promise<ProductReturn> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductReturn | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateProductReturnDto): Promise<ProductReturn | null> {
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
    async findHomePageProductReturn(): Promise<ProductReturn[]> {
        return await this.model
        .find({isDeleted: false })
        .skip(0)
        .limit(6)
        .sort({ _id: 'desc' }).lean();
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

    async findAll(): Promise<ProductReturn[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<ProductReturn | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

}