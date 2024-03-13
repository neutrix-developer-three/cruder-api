import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
import { InvoicePaymentPayloadInterface } from '../invoice-payment-payload.interface';



@Schema({ timestamps: true, id: true, versionKey: false })
export class InvoicePayment extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  invoiceId: string;

  @Prop({ default: null, nullable: true })
  customerId: string;

  @Prop({ default: null, nullable: true })
  customerName: string;

  @Prop({ default: null, nullable: true })
  paymentAmount: number;

  @Prop({ default: null, nullable: true })
  paymentDate: string;

  @Prop({ type: {}, default: undefined })
  paymentPayload: InvoicePaymentPayloadInterface;

  @Prop({ default: null, nullable: true })
  paymentTransID: string;

  @Prop({ default: null, nullable: true })
  refundTransId: string;

  @Prop({ default: null, nullable: true })
  refund_amount: number;

  @Prop({ default: 0, nullable: true })
  isRefund: number;

  @Prop({ default: null, nullable: true })
  ct: string;


}

export const InvoicePaymentSchema = SchemaFactory.createForClass(InvoicePayment);