import mongoose, { Model, Types } from 'mongoose';
import { OfferProduct } from './schema/offer-product.schema';
import { CreateOfferProductDto } from './dto/create-offer-product.dto';
import { UpdateOfferProductDto } from './dto/update-offer-product.dto';


export class OfferProductRepository<ProductCategoryDocument extends OfferProduct> {
    constructor(private readonly model: Model<ProductCategoryDocument>) { }

    async createEntity(data: CreateOfferProductDto): Promise<OfferProduct> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<OfferProduct | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('category').populate('product');
    }


    async updateEntity(id: string, data: UpdateOfferProductDto): Promise<OfferProduct | null> {
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
            .sort({ createdAt: -1 }).populate('category').populate('product');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }
    async findHomePageOfferProduct(): Promise<OfferProduct[]> {
        return await this.model
        .find({isDeleted: false })
        .skip(0)
        .limit(6)
        .sort({ _id: 'desc' }).populate('category').lean();
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

    async findAll(): Promise<OfferProduct[]> {
        return await this.model.find({ isDeleted: false }).populate('category').populate('product');
    }

    async findOneByFilterQuery(query: any): Promise<OfferProduct | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
    async findMaxPositionEntity(): Promise<OfferProduct | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ position: -1 });
    }

}