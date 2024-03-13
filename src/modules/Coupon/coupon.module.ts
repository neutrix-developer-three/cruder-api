import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CouponSchema } from "./schema/coupon.schema";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";
import { ProductCategorySchema } from "../Product/product-category/schema/product-category.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'coupons', schema: CouponSchema },
        { name: 'product_categories', schema: ProductCategorySchema }]),
    ],
    controllers: [CouponController],
    providers: [CouponService]
})
export class CouponModule {
}
