import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { Users } from 'src/modules/CRUD/users/schema/users.schema';

export class CreateOrderDto {
  @IsNotEmpty()
  orderId: string;

  @IsOptional()
  trackingNumber: string;

  @IsOptional()
  customerId: string;

  @IsOptional()
  customerName: string;

  @IsOptional()
  totalQuantity: number;

  @IsOptional()
  totalAmount: number;

  @IsOptional()
  totalDiscountAmount: number;

  @IsOptional()
  paymentMethodId: number;

  @IsOptional()
  paymentMethodName: string;

  @IsOptional()
  shippingMethodId: string;

  @IsOptional()
  shippingMethodName: string;

  @IsOptional()
  shippingMethodPrice: number;

  @IsOptional()
  paymentStatus: string;

  @IsOptional()
  deliveryStatus: string;

  @IsOptional()
  sales_tax: number;

  @IsOptional()
  remarks: string;

  @IsOptional()
  status: string;

  @IsOptional()
  isManual: string;

  @IsOptional()
  isFreeShipping: string;

  @IsOptional()
  coupon_amount: number;

  @IsOptional()
  couponCode: string;

  @IsOptional()
  isReturn: string;

  @IsNotEmpty()
  ct: string;

  @IsEmpty()
  user: Users;

  
}
