import mongoose, { Model, Types } from 'mongoose';
import { UpdateSecretKeyCmsDto } from './dto/update-secret-key-cms.dto';
import { SecretKeyCms } from './schema/secret-key-cms.schema';

export class SecretKeyCmsRepository<SecretKeyCmsDocument extends SecretKeyCms> {
    constructor(private readonly model: Model<SecretKeyCmsDocument>) { }

    async createEntity(data: UpdateSecretKeyCmsDto): Promise<SecretKeyCmsDocument> {
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

    async findOneEntity(): Promise<SecretKeyCmsDocument | null> {
        return await this.model.findOne({ isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateSecretKeyCmsDto): Promise<SecretKeyCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findAll(): Promise<SecretKeyCmsDocument[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<SecretKeyCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}