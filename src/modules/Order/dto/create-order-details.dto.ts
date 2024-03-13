import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDetailsDto {
  @IsNotEmpty()
  orderId: string;

  @IsOptional()
  customerId: string;

  @IsOptional()
  customerName: string;

  @IsOptional()
  productId: string;

  @IsOptional()
  productName: string;

  @IsOptional()
  productImage: string;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;

  @IsOptional()
  discountWithPrice: number;

  @IsOptional()
  totalDiscountWithPrice: number;

  @IsOptional()
  discountAmount: number;

  @IsOptional()
  totalAmount: number;

  @IsOptional()
  isReturn: string;

  @IsOptional()
  tax_rate: number;

  @IsNotEmpty()
  ct: string;

  
}
