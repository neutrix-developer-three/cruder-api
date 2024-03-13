import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBillingAddressDto {
  @IsNotEmpty()
  orderId: string;

  @IsOptional()
  customerId: string;

  @IsOptional()
  customerName: string;

  @IsOptional()
  name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  email: string;

  @IsOptional()
  country: string;

  @IsOptional()
  city: string;

  @IsOptional()
  postCode: string;

  @IsOptional()
  address: string;
  
  
}
