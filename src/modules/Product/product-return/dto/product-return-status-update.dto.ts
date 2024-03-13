import { IsEnum, IsNotEmpty } from "class-validator";
import { ProductReturnStatusEnumType } from "src/utils/enum.utils";

export class ProductReturnStatusUpdateDto {
    @IsNotEmpty()
    returnId: string;

    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsEnum(ProductReturnStatusEnumType)
    status: ProductReturnStatusEnumType;
}
