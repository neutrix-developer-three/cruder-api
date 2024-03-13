import mongoose, { Model, Types } from 'mongoose';
import { SalesTaxCms } from './schema/sales-tax-cms.schema';
import { UpdateSalesTaxCmsDto } from './dto/update-sales-tax-cms.dto';

export class SalesTaxCmsRepository<SalesTaxCmsDocument extends SalesTaxCms> {
    constructor(private readonly model: Model<SalesTaxCmsDocument>) { }

    async createEntity(data: UpdateSalesTaxCmsDto): Promise<SalesTaxCmsDocument> {
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

    async findOneEntity(): Promise<SalesTaxCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateSalesTaxCmsDto): Promise<SalesTaxCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findAll(): Promise<SalesTaxCmsDocument[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<SalesTaxCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}