import { Model, Types } from 'mongoose';
import { BlogPageComponentUiCms } from './schema/blog-page-component-ui-cms.schema';
import { UpdateBlogPageComponentUiCmsDto } from './dto/update-blog-page-component-ui-cms.dto';

export class BlogPageComponentUiCmsRepository<BlogPageComponentUiCmsDocument extends BlogPageComponentUiCms> {
    constructor(private readonly model: Model<BlogPageComponentUiCmsDocument>) { }

    async createEntity(data: UpdateBlogPageComponentUiCmsDto): Promise<BlogPageComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<BlogPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateBlogPageComponentUiCmsDto): Promise<BlogPageComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<BlogPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}