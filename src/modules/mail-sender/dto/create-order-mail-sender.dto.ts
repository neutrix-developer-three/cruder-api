export class CreateOrderMailSenderDto {
    to: string;
    from: string;
    subject: string;
    orderId:string;
    template?: string;
}