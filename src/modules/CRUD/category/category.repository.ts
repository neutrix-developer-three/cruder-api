import mongoose, { Model, Types } from 'mongoose';
import { Category } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class CategoryRepository<CategoryDocument extends Category> {
    constructor(private readonly model: Model<CategoryDocument>) { }

    async createEntity(data: CreateCategoryDto): Promise<Category> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Category | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }

        // return await this.model.findById(id);
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async findOneEntityBySlug(urlSlug: string): Promise<Category | null> {
        try {
            return await this.model.findOne({ urlSlug: urlSlug, isDeleted: false });
        } catch (e) {
            return e;
        }
    }

    async updateEntity(id: string, data: UpdateCategoryDto): Promise<Category | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteEntity(id: string): Promise<boolean> {
        // const data = await this.model.findByIdAndDelete(id);
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<Category[]> {
        return await this.model.find({ isDeleted: false });
    }

    async countAllQuery(): Promise<any | Error> {
        try {
            return await this.model.countDocuments({
                    isDeleted: false,
            });
        } catch (e) {
            return e;
        }
    }
}