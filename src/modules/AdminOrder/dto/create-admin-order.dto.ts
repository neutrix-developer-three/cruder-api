import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { Users } from "src/modules/CRUD/users/schema/users.schema";
import { Cart } from "src/modules/Order/cart.interface";

export class CreateAdminOrderDto {
    @IsNotEmpty()
    cardHolderName: string;
  
    @IsNotEmpty()
    cardnumber: string;
  
    @IsNotEmpty()
    expirationdate: string;
  
    @IsNotEmpty()
    securitycode: string;
  
    @IsOptional()
    cusName: string;
  
    @IsOptional()
    cusEmail: string;

    @IsOptional()
    email: string;
  
    @IsOptional()
    cusPhone: string;
  
    @IsOptional()
    fullName: string;
  
    @IsOptional()
    phone: string;
  
    @IsOptional()
    city: string;
  
    @IsOptional()
    postCode: string;
  
    @IsOptional()
    country: string;
  
    @IsOptional()
    address: string;
  
    @IsOptional()
    remarks: string;
  
    @IsOptional()
    shipping_method: string;
  
    @IsOptional()
    shipping_method_price: number;
  
    @IsOptional()
    sales_tax: number;
  
    @IsOptional()
    discountAmt: number;
  
    @IsNotEmpty()
    cartInfo: Cart[];
  
    @IsEmpty()
    user: Users;
  }