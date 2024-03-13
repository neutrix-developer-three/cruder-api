import { IsNotEmpty } from "class-validator";

export class InvoiceRefundDto {
    @IsNotEmpty()
    orderId: string;
  
    @IsNotEmpty()
    transactionId: string;
  
    @IsNotEmpty()
    refundAmount: number;
  
  }