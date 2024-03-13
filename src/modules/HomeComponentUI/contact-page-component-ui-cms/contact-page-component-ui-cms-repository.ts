import { Model, Types } from 'mongoose';
import { ContactPageComponentUiCms } from './schema/contact-page-component-ui-cms.schema';
import { UpdateContactPageComponentUiCmsDto } from './dto/update-contact-page-component-ui-cms.dto';

export class ContactPageComponentUiCmsRepository<ContactPageComponentUiCmsDocument extends ContactPageComponentUiCms> {
    constructor(private readonly model: Model<ContactPageComponentUiCmsDocument>) { }

    async createEntity(data: UpdateContactPageComponentUiCmsDto): Promise<ContactPageComponentUiCmsDocument> {
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

    async findOneEntity(): Promise<ContactPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateContactPageComponentUiCmsDto): Promise<ContactPageComponentUiCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<ContactPageComponentUiCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}