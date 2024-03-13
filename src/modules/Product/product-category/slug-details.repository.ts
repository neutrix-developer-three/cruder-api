import mongoose, { Model, Types } from 'mongoose';
import { SlugDetails } from './schema/slug-details.schema';
import { CreateSlugDetailsDto } from './dto/create-slug-details.dto';


export class SlugDetailsRepository<SlugDetailsDocument extends SlugDetails> {
    constructor(private readonly model: Model<SlugDetailsDocument>) { }

    async createEntity(data: CreateSlugDetailsDto): Promise<SlugDetails> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<SlugDetails | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
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
            .sort({ createdAt: -1 }).lean();

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

    async findAll(): Promise<SlugDetails[]> {
        return await this.model.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
    }


    async findOneByFilterQuery(query: any): Promise<SlugDetails | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
    async findOneEntityBySlug(slug: string): Promise<SlugDetails | null> {
        try {
            return await this.model.findOne({ slug: slug, isDeleted: false });
        } catch (e) {
            return null;
        }
    }

}