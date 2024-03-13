import { Model, Types } from 'mongoose';
import { UpdateOurProcessVideoCmsDto } from './dto/update-our-process-video-cms.dto';
import { OurProcessVideoCms } from './schema/our-process-video-cms.schema';

export class OurProcessVideoCmsRepository<OurProcessVideoCmsDocument extends OurProcessVideoCms> {
    constructor(private readonly model: Model<OurProcessVideoCmsDocument>) { }

    async createEntity(data: UpdateOurProcessVideoCmsDto): Promise<OurProcessVideoCmsDocument> {
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

    async findOneEntity(): Promise<OurProcessVideoCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateOurProcessVideoCmsDto): Promise<OurProcessVideoCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<OurProcessVideoCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}