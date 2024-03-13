import mongoose, { Model, Types } from 'mongoose';
import { UpdateAuthorizePaymentConfigCmsDto } from './dto/update-authorize-payment-config-cms.dto';
import { AuthorizePaymentConfigCms } from './schema/authorize-payment-config-cms.schema';


export class AuthorizePaymentConfigCmsRepository<AuthorizePaymentConfigCmsDocument extends AuthorizePaymentConfigCms> {
    constructor(private readonly model: Model<AuthorizePaymentConfigCmsDocument>) { }

    async createEntity(data: UpdateAuthorizePaymentConfigCmsDto): Promise<AuthorizePaymentConfigCmsDocument> {
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

    async findOneEntity(): Promise<AuthorizePaymentConfigCmsDocument | null> {
        return await this.model.findOne({isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateAuthorizePaymentConfigCmsDto): Promise<AuthorizePaymentConfigCmsDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async findOneByFilterQuery(query: any): Promise<AuthorizePaymentConfigCmsDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }
}