import mongoose, { Model, Types } from 'mongoose';
import { AboutUsOffer } from './schema/about-us-offer.schema';
import { CreateAboutUsOfferDto } from './dto/create-about-us-offer.dto';
import { UpdateAboutUsOfferDto } from './dto/update-about-us-offer.dto';


export class AboutUsOfferRepository<AboutUsOfferDocument extends AboutUsOffer> {
    constructor(private readonly model: Model<AboutUsOfferDocument>) { }

    async createEntity(data: CreateAboutUsOfferDto): Promise<AboutUsOffer> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<AboutUsOffer | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateAboutUsOfferDto): Promise<AboutUsOffer | null> {
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

    async deleteEntity(id: string): Promise<boolean> {
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<AboutUsOffer[]> {
        return await this.model.find({ isDeleted: false });
    }

}