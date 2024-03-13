import mongoose, { Model, Types } from 'mongoose';
import { NewsletterPopupCms } from './schema/newsletter-popup-cms.schema';
import { UpdateNewsletterPopupCmsDto } from './dto/update-newsletter-popup-cms.dto';

export class NewsletterPopupCmsRepository<NewsletterPopupCmsDocument extends NewsletterPopupCms> {
    constructor(private readonly model: Model<NewsletterPopupCmsDocument>) { }

    async createEntity(data: UpdateNewsletterPopupCmsDto): Promise<NewsletterPopupCmsDocument> {
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

    async findOneEntity(): Promise<NewsletterPopupCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateNewsletterPopupCmsDto): Promise<NewsletterPopupCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<NewsletterPopupCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}