import mongoose, { Model, Types } from 'mongoose';
import { ProductCategory } from './schema/product-category.schema';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';



export class ProductCategoryRepository<ProductCategoryDocument extends ProductCategory> {
    constructor(private readonly model: Model<ProductCategoryDocument>) { }

    async createEntity(data: CreateProductCategoryDto): Promise<ProductCategory> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductCategory | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('category');
    }


    async updateEntity(id: string, data: UpdateProductCategoryDto): Promise<ProductCategory | null> {
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
            .sort({ position: 'asc' }).populate('category').lean();

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

    async findAll(): Promise<ProductCategory[]> {
        return await this.model.find({ isDeleted: false }).sort({ position: 'asc' }).populate('category');
    }


    async findAllParentCategory(): Promise<ProductCategory[]> {
        return await this.model.find({ isDeleted: false,$or: [{ categoryId: null }, { categoryId: '' }] }).sort({ position: 'asc' }).lean();
    }


    async findAllByFilterQuery(query: any): Promise<ProductCategory[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }

    async findOneByFilterQuery(query: any): Promise<ProductCategory | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
    async findMaxPositionEntity(): Promise<ProductCategory | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ position: -1 });
    }

    async findOneEntityBySlug(slug: string): Promise<ProductCategory | null> {
        try {
            return await this.model.findOne({ slug: slug, isDeleted: false });
        } catch (e) {
            return null;
        }
    }

}