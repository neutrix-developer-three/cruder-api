import mongoose, { Model, Types } from 'mongoose';
import { HomeGallery } from './schema/home-gallery.schema';
import { CreateHomeGalleryDto } from './dto/create-home-gallery.dto';
import { UpdateHomeGalleryDto } from './dto/update-home-gallery.dto';


export class HomeGalleryRepository<HomeGalleryDocument extends HomeGallery> {
    constructor(private readonly model: Model<HomeGalleryDocument>) { }

    async createEntity(data: CreateHomeGalleryDto): Promise<HomeGallery> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<HomeGallery | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }


    async updateEntity(id: string, data: UpdateHomeGalleryDto): Promise<HomeGallery | null> {
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

    async findAll(): Promise<HomeGallery[]> {
        return await this.model.find({ isDeleted: false });
    }

}