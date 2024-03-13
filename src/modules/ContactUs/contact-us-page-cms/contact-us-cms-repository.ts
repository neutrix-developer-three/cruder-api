import { Model, Types } from 'mongoose';
import { ContactUsCms } from './schema/contact-us-cms.schema';
import { UpdateContactUsCmsDto } from './dto/update-contact-us-cms.dto';

export class ContactUsCmsRepository<ContactUsCmsDocument extends ContactUsCms> {
    constructor(private readonly model: Model<ContactUsCmsDocument>) { }

    async createEntity(data: UpdateContactUsCmsDto): Promise<ContactUsCmsDocument> {
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

    async findOneEntity(): Promise<ContactUsCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateContactUsCmsDto): Promise<ContactUsCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ContactUsCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}