import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesTaxCmsService } from './sales-tax-cms.service';
import { SalesTaxCmsController } from './sales-tax-cms.controller';
import { SalesTaxCmsSchema } from './schema/sales-tax-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'sales_taxes', schema: SalesTaxCmsSchema }
        ])
    ],
    controllers: [SalesTaxCmsController],
    providers: [SalesTaxCmsService]
})
export class SalesTaxCmsModule {}
