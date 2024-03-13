import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ProductReturnStatusEnumType } from "src/utils/enum.utils";

export class CreateProductReturnDto {
    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    reason: string;

    @IsNotEmpty()
    productId: string;

    @IsEmpty()
    productName: string;

    @IsEmpty()
    customerName: string;

    @IsEmpty()
    itemPrice: number;

    @IsEmpty()
    totalPrice: number;

    @IsEmpty()
    sales_tax: number;

    @IsEmpty()
    payableAmount: number;

    @IsEmpty()
    updated_by: string;


    @IsNotEmpty()
    @IsEnum(ProductReturnStatusEnumType)
    status: ProductReturnStatusEnumType;
}
