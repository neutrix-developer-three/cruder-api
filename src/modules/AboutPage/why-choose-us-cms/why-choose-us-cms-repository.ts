import { Model, Types } from 'mongoose';
import { WhyChooseUsCms } from './schema/why-choose-us-cms.schema';
import { UpdateWhyChooseUsCmsDto } from './dto/update-why-choose-us-cms.dto';

export class WhyChooseUsCmsRepository<WhyChooseUsCmsDocument extends WhyChooseUsCms> {
    constructor(private readonly model: Model<WhyChooseUsCmsDocument>) { }

    async createEntity(data: UpdateWhyChooseUsCmsDto): Promise<WhyChooseUsCmsDocument> {
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

    async findOneEntity(): Promise<WhyChooseUsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateWhyChooseUsCmsDto): Promise<WhyChooseUsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<WhyChooseUsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}