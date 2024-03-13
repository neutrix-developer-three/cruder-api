import { Model, Types } from 'mongoose';
import { BlogMetaCms } from './schema/blog-meta-cms.schema';
import { UpdateBlogMetaCmsDto } from './dto/update-blog-meta-cms.dto';

export class BlogMetaCmsRepository<BlogMetaCmsDocument extends BlogMetaCms> {
    constructor(private readonly model: Model<BlogMetaCmsDocument>) { }

    async createEntity(data: UpdateBlogMetaCmsDto): Promise<BlogMetaCmsDocument> {
        try {
            const createdEntity = new this.model({
                ...data,
                _id: new Types.ObjectId()
            });
            return await createdEntity.save();
        } catch (err) {
            console.log(err);
        }
    }

    async findOneEntity(): Promise<BlogMetaCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateBlogMetaCmsDto): Promise<BlogMetaCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<BlogMetaCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}