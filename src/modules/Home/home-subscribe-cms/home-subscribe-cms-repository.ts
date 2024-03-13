import { Model, Types } from 'mongoose';
import { HomeSubscribeCms } from './schema/home-subscribe-cms.schema';
import { UpdateHomeSubscribeCmsDto } from './dto/update-home-subscribe-cms.dto';

export class HomeSubscribeCmsRepository<HomeSubscribeCmsDocument extends HomeSubscribeCms> {
    constructor(private readonly model: Model<HomeSubscribeCmsDocument>) { }

    async createEntity(data: UpdateHomeSubscribeCmsDto): Promise<HomeSubscribeCmsDocument> {
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

    async findOneEntity(): Promise<HomeSubscribeCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateHomeSubscribeCmsDto): Promise<HomeSubscribeCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<HomeSubscribeCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}