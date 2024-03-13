import mongoose, { Model, Types } from 'mongoose';
import { HeroSectionCms } from './schema/hero-section-cms.schema';
import { UpdateHeroSectionCmsDto } from './dto/update-hero-section-cms.dto';

export class HeroSectionCmsRepository<HeroSectionCmsDocument extends HeroSectionCms> {
    constructor(private readonly model: Model<HeroSectionCmsDocument>) { }

    async createEntity(data: UpdateHeroSectionCmsDto): Promise<HeroSectionCmsDocument> {
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

    async findOneEntity(): Promise<HeroSectionCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHeroSectionCmsDto): Promise<HeroSectionCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HeroSectionCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}