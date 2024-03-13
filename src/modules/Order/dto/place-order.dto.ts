import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Cart } from '../cart.interface';
import { CheckoutEnumType } from 'src/utils/enum.utils';
import { Users } from 'src/modules/CRUD/users/schema/users.schema';

export class PlaceOrderDto {
  @IsNotEmpty()
  cardHolderName: string;

  @IsNotEmpty()
  cardnumber: string;

  @IsNotEmpty()
  expirationdate: string;

  @IsNotEmpty()
  securitycode: string;

  @IsOptional()
  bname: string;

  @IsOptional()
  blastname: string;

  @IsOptional()
  bmobile: string;

  @IsOptional()
  bemail: string;

  @IsOptional()
  bcity: string;

  @IsOptional()
  bcountry: string;

  @IsOptional()
  bpostCode: string;

  @IsOptional()
  baddress: string;

  @IsOptional()
  sname: string;

  @IsOptional()
  slastname: string;

  @IsOptional()
  smobile: string;

  @IsOptional()
  semail: string;

  @IsOptional()
  scountry: string;

  @IsOptional()
  scity: string;

  @IsOptional()
  spostCode: string;

  @IsOptional()
  saddress: string;

  @IsOptional()
  remarks: string;

  @IsOptional()
  shipping_method: string;

  @IsOptional()
  shipping_method_price: number;

  @IsOptional()
  sales_tax: number;

  @IsOptional()
  couponAmt: number;

  @IsOptional()
  couponCode: string;

  @IsOptional()
  isShipping: string;

  @IsNotEmpty()
  @IsEnum(CheckoutEnumType)
  ct: CheckoutEnumType;

  @IsNotEmpty()
  cartInfo: Cart[];

  @IsEmpty()
  user: Users;
}
