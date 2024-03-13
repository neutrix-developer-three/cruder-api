import mongoose, { Model, Types } from 'mongoose';
import { Pages } from './schema/pages.schema';
import { CreatePagesDto } from './dto/create-pages.dto';
import { UpdatePagesDto } from './dto/update-pages.dto';


export class PagesRepository<PagesDocument extends Pages> {
    constructor(private readonly model: Model<PagesDocument>) { }

    async createEntity(data: CreatePagesDto): Promise<Pages> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Pages | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdatePagesDto): Promise<Pages | null> {
        const updatedEntity =  await this.model.findByIdAndUpdate(id, data, { new: true });
        return await this.findOneEntity(id);
    }

    async paginate(page: number, limit: number, query?: any) {
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments({ ...query, isDeleted: false });
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

    async findAll(): Promise<Pages[]> {
        return await this.model.find({ isDeleted: false });
    }

}