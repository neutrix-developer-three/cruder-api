import mongoose, { Model, Types } from 'mongoose';
import { ProductReview } from './schema/product-review.schema';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';



export class ProductReviewRepository<ProductReviewDocument extends ProductReview> {
    constructor(private readonly model: Model<ProductReviewDocument>) { }

    async createEntity(data: CreateProductReviewDto): Promise<ProductReview> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<ProductReview | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('product');
    }


    async updateEntity(id: string, data: UpdateProductReviewDto): Promise<ProductReview | null> {
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

    async countAllReviewByProduct(productId:string){
        const total = await this.model.countDocuments({
            productId:productId,
            reviewStatus:'Confirm',
            isDeleted: false
        });
        return total;
    }

    async findAllReviewByProduct(productId:string){
        return await this.model.find({ isDeleted: false, productId:productId, reviewStatus:'Confirm'}).sort({ createdAt: -1 }).lean();
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

    async findAll(): Promise<ProductReview[]> {
        return await this.model.find({ isDeleted: false });
    }


    async findAllByFilterQuery(query: any): Promise<ProductReview[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }

    async findOneByFilterQuery(query: any): Promise<ProductReview | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
    async findMaxPositionEntity(): Promise<ProductReview | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ position: -1 });
    }

}