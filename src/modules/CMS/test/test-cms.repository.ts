
import mongoose, { Model, Types } from 'mongoose';
import { UpdateTestCMSDto } from './dto/update-test-cms.dto';
import { TestCMS } from './entites/test-cms.entity';

export class TestCMSRepository<TestCMSDocument extends TestCMS> {
    constructor(private readonly model: Model<TestCMSDocument>) { }

    async createEntity(data: UpdateTestCMSDto): Promise<TestCMSDocument> {
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

    async findOneEntity(id: string): Promise<TestCMSDocument | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }

    async updateEntity(id: string, data: UpdateTestCMSDto): Promise<TestCMSDocument | null> {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            console.log(err);
        }
    }

    async deleteEntity(id: string): Promise<boolean> {
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<TestCMSDocument[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findOneByFilterQuery(query: any): Promise<TestCMSDocument | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

    async findByFilterQuery(query: any): Promise<TestCMSDocument[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }
}
