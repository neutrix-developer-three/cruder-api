import mongoose, { Model, Document, Types } from 'mongoose';
import { Users } from './schema/users.schema';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import CryptoUtils from 'src/utils/crypto.utils';
import { ChangePasswordDto } from 'src/modules/auth/dto/change-password.dto';
import { FilterDto } from 'src/core/filter.dto';

export class UsersRepository<UsersDocument extends Users> {
    constructor(private readonly model: Model<UsersDocument>) { }

    async createEntity(data: CreateUsersDto): Promise<Users> {
        console.log('insert data : ', data);
        const createdEntity = new this.model({
            ...data,
            password: await CryptoUtils.encrypt(data?.password),
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }


    async findOneEntity(id: string): Promise<Users | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false }).populate('role');
    }

    async findOneByFilterQuery(query: any): Promise<Users | null> {
        return await this.model.findOne({ ...query, isDeleted: false, userType:'admin' }).populate('role').lean();
    }

    async findOneCustomerByFilterQuery(query: any): Promise<Users | null> {
        return await this.model.findOne({ ...query, isDeleted: false, userType:'customer' }).lean();
    }

    async findOneUserByFilterQuery(query: any): Promise<Users | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }


    async updateEntity(id: string, data: UpdateUsersDto): Promise<Users | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async updatePasswordEntity(id: string, data: ChangePasswordDto): Promise<Users | null> {
        return await this.model.findByIdAndUpdate(id, {password:await CryptoUtils.encrypt(data?.newPassword)}, { new: true });
    }

    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,fullName: { $regex: searchKeyword, $options: 'i' }}
        }
        const total = await this.model.countDocuments({
            ...query,
            userType:'admin',
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false, userType:'admin' })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).populate('role');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }

    async customerPaginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,fullName: { $regex: searchKeyword, $options: 'i' }}
        }
        const total = await this.model.countDocuments({
            ...query,
            userType:'customer',
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false, userType:'customer' })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).populate('role');

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }

    async deleteEntity(id: string): Promise<boolean> {
        // const data = await this.model.findByIdAndDelete(id);
        const data = await this.model.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        if (data) return true;
        return false;
    }

    async findAll(): Promise<Users[]> {
        return await this.model.find({ isDeleted: false, userType:'admin' }).populate('role');
    }

    async findAllAdminUser(): Promise<Users[]> {
        return await this.model.find({ isDeleted: false, userType:'admin' }).sort({ createdAt: -1 }).lean();
    }

    async findAllReportUser(): Promise<Users[]> {
        return await this.model.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
    }
    
}