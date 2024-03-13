import { Model, Types } from 'mongoose';
import { UpdateAboutUsCmsDto } from './dto/update-about-us-cms.dto';
import { AboutUsCms } from './schema/about-us-cms.schema';

export class AboutUsCmsRepository<AboutUsCmsDocument extends AboutUsCms> {
    constructor(private readonly model: Model<AboutUsCmsDocument>) { }

    async createEntity(data: UpdateAboutUsCmsDto): Promise<AboutUsCmsDocument> {
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

    async findOneEntity(): Promise<AboutUsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateAboutUsCmsDto): Promise<AboutUsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<AboutUsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}