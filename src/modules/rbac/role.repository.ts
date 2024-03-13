import mongoose, { Model, Types } from 'mongoose';
import { Role } from './schema/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';


export class RoleRepository<RoleDocument extends Role> {
    constructor(private readonly model: Model<RoleDocument>) { }

    async createEntity(data: CreateRoleDto): Promise<Role> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<Role | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('pageAccess');;
    }


    async updateEntity(id: string, data: UpdateRoleDto): Promise<Role | null> {
        const updatedEntity =  await this.model.findByIdAndUpdate(id, data, { new: true });
        return await this.findOneEntity(id);
    }

    async paginate(page: number, limit: number, query?: any) {
        const skip = (page - 1) * limit;
        const total = await this.model.countDocuments({ ...query, isDeleted: false });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('pageAccess');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
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

    async findAll(): Promise<Role[]> {
        return await this.model.find({ isDeleted: false }).populate('pageAccess');;
    }

    async findOneByFilterQuery(query: any): Promise<Role | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

}