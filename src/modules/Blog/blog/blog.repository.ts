import mongoose, { Model, Types } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schema/blog.schema';
import { FilterDto } from 'src/core/filter.dto';


export class BlogRepository<BlogDocument extends Blog> {
    constructor(private readonly model: Model<BlogDocument>) { }

    async createEntity(data: CreateBlogDto): Promise<Blog> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Blog | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async findHomePageBlog(): Promise<Blog[]> {
        return await this.model
        .find({isDeleted: false,isPublish:'publish' })
        .skip(0)
        .limit(2)
        .sort({ _id: 'desc' });
    }



    async updateEntity(id: string, data: UpdateBlogDto): Promise<Blog | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,title: { $regex: searchKeyword, $options: 'i' }}
        }
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

    async findAll(): Promise<Blog[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<Blog | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

}