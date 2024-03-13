import { Model, Types } from 'mongoose';
import { UpdateBlogPageCmsDto } from './dto/update-blog-page-cms.dto';
import { BlogPageCms } from './schema/blog-page-cms.schema';

export class BlogPageCmsRepository<BlogPageCmsDocument extends BlogPageCms> {
    constructor(private readonly model: Model<BlogPageCmsDocument>) { }

    async createEntity(data: UpdateBlogPageCmsDto): Promise<BlogPageCmsDocument> {
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

    async findOneEntity(): Promise<BlogPageCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateBlogPageCmsDto): Promise<BlogPageCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<BlogPageCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}