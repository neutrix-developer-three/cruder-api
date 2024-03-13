import mongoose, { Model, Types } from 'mongoose';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterDto } from 'src/core/filter.dto';


export class ProductRepository<ProductDocument extends Product> {
    constructor(private readonly model: Model<ProductDocument>) { }

    async createEntity(data: CreateProductDto): Promise<Product> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Product | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }
    async findOnePopulateEntity(id: string): Promise<Product | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('product_tag').populate('recommendation_product');
    }


    async updateEntity(id: string, data: UpdateProductDto): Promise<Product | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,name: { $regex: searchKeyword, $options: 'i' }}
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
    async findAll(): Promise<Product[]> {
        return await this.model.find({ isDeleted: false }).sort({ position: 'asc' }).populate('product_tag').populate('recommendation_product').lean();
    }

    async findAllProductList(): Promise<Product[]> {
        return await this.model.find({ isDeleted: false }).sort({ position: 'asc' }).populate('categories').populate('product_tag').populate('recommendation_product').lean();
    }

    async findHomePageProduct(): Promise<Product[]> {
        return await this.model
        .find({isDeleted: false })
        .skip(0)
        .limit(6)
        .sort({ position: 'asc' }).populate('product_tag').populate('recommendation_product').lean();
    }

    async findAllRelatedProduct(productId:string, categoryIds:string[]): Promise<Product[]> {
        return await this.model
        .find({isDeleted: false,categoryIds: { $in: categoryIds }, _id: { $ne: productId }})
        .skip(0)
        .limit(3)
        .sort({ position: 'asc' }).populate('product_tag').populate('recommendation_product').lean();
    }


    async findAllCategoryWiseProduct(categoryId:string): Promise<Product[]> {
        let query:any;
        if(categoryId){
            query = {...query,categoryIds: { $in: categoryId }}
        }
        return await this.model.find({...query, isDeleted: false }).sort({ position: 'asc' }).lean();
    }
    async findAllProductByCategory(categoryId:string): Promise<Product[]> {
        let query:any;
        if(categoryId){
            query = {...query,categoryIds: { $in: categoryId }}
        }
        return await this.model.find({...query, isDeleted: false }).sort({ position: 'asc' }).populate('product_tag').populate('recommendation_product').lean();
    }

    async findAllProductByIds(ProductIds:string[]): Promise<Product[]> {
        return await this.model.find({_id: { $in: ProductIds }, isDeleted: false }).lean();
    }

    async findOneByFilterQuery(query: any): Promise<Product | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
    async findMaxPositionEntity(): Promise<Product | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ position: -1 });
    }

    async findOneEntityBySlug(slug: string): Promise<Product | null> {
        try {
            return await this.model.findOne({ slug: slug, isDeleted: false }).populate('product_tag').populate('recommendation_product');
        } catch (e) {
            return null;
        }
    }

    async findAllProductMeta(): Promise<Product[]> {
        return await this.model.find({ isDeleted: false }).sort({ position: 'asc' }).lean();
    }


}