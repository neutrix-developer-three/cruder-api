import mongoose, { Model, Types } from 'mongoose';
import { CreateInvoicePaymentDto } from './dto/create-invoice-payment.dto';
import { InvoicePayment } from './schema/invoice-payment.schema';
import { UpdateInvoicePaymentDto } from './dto/update-invoice-payment.dto';
import { FilterDto } from 'src/core/filter.dto';

export class InvoicePaymentRepository<InvoicePaymentDocument extends InvoicePayment> {
    constructor(private readonly model: Model<InvoicePaymentDocument>) { }

    async createEntity(data: CreateInvoicePaymentDto): Promise<InvoicePayment> {
        const createdEntity = new this.model({
            ...data,
            _id: new Types.ObjectId()
        });
        return await createdEntity.save();
    }

    async findOneEntity(id: string): Promise<InvoicePayment | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        }
        return await this.model.findOne({ _id: id, isDeleted: false });
    }
    async paginate(filterDto:FilterDto, query?: any) {
        const {page:pageParam,limit:limitParam, searchKeyword} = filterDto;
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        let skip = (page - 1) * limit;
        if(searchKeyword){
            skip=0;
            query = {...query,invoiceId: { $regex: searchKeyword, $options: 'i' }}
        }
        const total = await this.model.countDocuments({
            ...query,
            isDeleted: false
        });
        const pageCount = Math.ceil(total / limit);

        const data = await this.model
            .find({ ...query, isDeleted: false })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }).lean();

        return {
            data: data,
            pageCount: pageCount,
            total: total
        };
    }

    async findAll(): Promise<InvoicePayment[]> {
        return await this.model.find({ isDeleted: false });
    }

    async findAllByFilterQuery(query: any): Promise<InvoicePayment[] | null> {
        return await this.model.find({ ...query, isDeleted: false }).lean();
    }

    async findAllReportPaymentByFilterQuery(query: any): Promise<InvoicePayment[] | null> {
        const payment = await this.model
            .aggregate([
            {
            $match: {
                ...query,
                isDeleted: false
            },
            },
            {
            $lookup: {
                from: 'billing_addresses',
                let: { invoiceId: '$invoiceId' },
                pipeline: [
                {
                    $match: {
                    $expr: {
                        $and: [
                        { $eq: ['$orderId', '$$invoiceId'] }, // Matching on orderId
                        { $eq: ['$isDeleted', false] },
                        ],
                    },
                    },
                },
                ],
                as: 'billingInfo',
            },
            },
            {
            $unwind: {
                path: '$billingInfo',
                preserveNullAndEmptyArrays: true,
            },
            },
            {
                $sort: {
                    createdAt: -1, // Sorting createdAt in descending order
                }
            }
        ])
        .exec();
      return payment;
    }

    async findLastEntity(): Promise<InvoicePayment | null> {
        return await this.model.findOne({ isDeleted: false }).sort({ createdAt: -1 });
    }

    async findOneByFilterQuery(query: any): Promise<InvoicePayment | null> {
        return await this.model.findOne({ ...query, isDeleted: false }).lean();
    }

    async updateEntityByFilter(where, data: UpdateInvoicePaymentDto): Promise<InvoicePayment | null> {
        return await this.model.findOneAndUpdate(where, data, { new: true });
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

}