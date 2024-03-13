import { IsNotEmpty, IsOptional } from 'class-validator';
import { InvoicePaymentPayloadInterface } from '../invoice-payment-payload.interface';

export class CreateInvoicePaymentDto {
  @IsNotEmpty()
  invoiceId: string;

  @IsOptional()
  customerId: string;

  @IsOptional()
  customerName: string;

  @IsOptional()
  paymentAmount: number;

  @IsOptional()
  paymentDate: string;

  @IsOptional()
  paymentPayload: InvoicePaymentPayloadInterface;

  @IsOptional()
  paymentTransID: string;

  @IsOptional()
  refundTransId?: string;

  @IsOptional()
  refund_amount?: number;

  @IsOptional()
  isRefund?: number;

  @IsNotEmpty()
  ct: string;

  
}
