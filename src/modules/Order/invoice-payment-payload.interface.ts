export interface InvoicePaymentPayloadInterface {
    cardPayload: {
      cardHolderName: string;
      cardnumber: string;
      expirationdate: string;
      securitycode: string;
    };
    resCardProcess: {
      responseCode: string;
      messageCode: string;
      description: string;
    };
  };