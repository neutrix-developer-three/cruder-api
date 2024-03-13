import mongoose, { Model, Types } from 'mongoose';
import { UpdateReturnsCmsDto } from './dto/update-returns-cms.dto';
import { ReturnsCms } from './schema/returns-cms.schema';

export class ReturnsCmsRepository<ReturnsCmsDocument extends ReturnsCms> {
    constructor(private readonly model: Model<ReturnsCmsDocument>) { }

    async createEntity(data: UpdateReturnsCmsDto): Promise<ReturnsCmsDocument> {
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

    async findOneEntity(): Promise<ReturnsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateReturnsCmsDto): Promise<ReturnsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ReturnsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}