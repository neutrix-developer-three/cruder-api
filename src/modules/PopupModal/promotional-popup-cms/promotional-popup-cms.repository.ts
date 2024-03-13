import mongoose, { Model, Types } from 'mongoose';
import { PromotionalPopupCms } from './schema/promotional-popup-cms.schema';
import { UpdatePromotionalPopupCmsDto } from './dto/update-promotional-popup-cms.dto';

export class PromotionalPopupCmsRepository<PromotionalPopupCmsDocument extends PromotionalPopupCms> {
    constructor(private readonly model: Model<PromotionalPopupCmsDocument>) { }

    async createEntity(data: UpdatePromotionalPopupCmsDto): Promise<PromotionalPopupCmsDocument> {
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

    async findOneEntity(): Promise<PromotionalPopupCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdatePromotionalPopupCmsDto): Promise<PromotionalPopupCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<PromotionalPopupCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}