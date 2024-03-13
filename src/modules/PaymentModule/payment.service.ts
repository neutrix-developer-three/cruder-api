import { Injectable } from '@nestjs/common';
import {
  APIContracts,
  APIControllers,
  Constants as SDKConstants,
} from 'authorizenet';
import { PlaceOrderDto } from '../Order/dto/place-order.dto';
import { generateRandomNumber } from 'src/utils/common-helper';
import { AuthPaymentConfig } from 'src/utils/constants';
import { InvoicePayment } from '../Order/schema/invoice-payment.schema';
import { InvoicePaymentPayloadInterface } from '../Order/invoice-payment-payload.interface';

@Injectable()
export class PaymentService {
  constructor() {}

  
  async makeAuthorizeTransaction(dto: PlaceOrderDto, authorizePaymentConfigCms,totalAmount,invoiceNumber): Promise<any> {
    const res = {
      responseText: 'fail',
      type: 'sale',
      responseCode: 101,
      transactionId: '',
      transRes: {},
    };
    const randomNumber = generateRandomNumber(5);
    const newInvoiceNo = invoiceNumber+'-'+randomNumber;
    const apiLoginKey = authorizePaymentConfigCms?.api_login_id;
    const transactionKey = authorizePaymentConfigCms?.transaction_key;
    const account_status = authorizePaymentConfigCms?.account_status;
    const merchantAuthenticationType =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginKey);
    merchantAuthenticationType.setTransactionKey(
      transactionKey
    );
    //merchantAuthenticationType.setRefId('123dr');
    let expiryMonthYear=dto.expirationdate;
    if(dto.expirationdate?.length==5){
      const dataYM = dto.expirationdate?.split('/');
      expiryMonthYear = `20${dataYM[1]}-${dataYM[0]}`;
    }
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(dto.cardnumber);
    creditCard.setExpirationDate(expiryMonthYear);
    creditCard.setCardCode(dto.securitycode);
    // creditCard.setCardNumber('4242424242424242');
    // creditCard.setExpirationDate('2026-11');
    // creditCard.setCardCode('111');

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);
    const orderDetails = new APIContracts.OrderType();
    orderDetails.setInvoiceNumber(newInvoiceNo);
    orderDetails.setDescription('Product description');
    // set the duplicate window parameter to 10 seconds
    //orderDetails.setExtraOptions('x_duplicate_window=1');


    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION,
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalAmount);
    transactionRequestType.setOrder(orderDetails);
    //transactionRequestType.setRefId('Ref-1234');
    

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(
      createRequest.getJSON(),
    );
    if(account_status==='PRODUCTION'){
      ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

    try {
      const apiResponse = await new Promise((resolve, reject) => {
        ctrl.execute(function () {
          const apiResponse = ctrl.getResponse();
          const response = new APIContracts.CreateTransactionResponse(
            apiResponse,
          );

          //pretty print response
          //console.log('api response : ', JSON.stringify(response, null, 2));

          if (response != null) {
            if (
              response.getMessages().getResultCode() ==
              APIContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() != null) {
                res.transactionId = response
                  ?.getTransactionResponse()
                  ?.getTransId();
                res.responseCode = 100;
                res.responseText='success';
                console.log(
                  'Successfully created transaction with Transaction ID: ' +
                    response.getTransactionResponse().getTransId(),
                );
                const transRes = {
                  responseCode: response
                    ?.getTransactionResponse()
                    ?.getResponseCode(),
                  messageCode: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getCode(),
                  description: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getDescription(),
                };
                res.transRes = transRes;
                console.log(
                  'Response Code: ' +
                    response.getTransactionResponse().getResponseCode(),
                );
                console.log(
                  'Message Code: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getCode(),
                );
                console.log(
                  'Description: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getDescription(),
                );
                resolve(res);
              } else {
                console.log('Failed Transaction.');
                if (response.getTransactionResponse().getErrors() != null) {
                  console.log(
                    'Error Code: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorCode(),
                  );
                  console.log(
                    'Error message: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorText(),
                  );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();
              
                }
                reject(res);
              }
            } else {
              console.log('Failed Transaction. ');
              if (
                response.getTransactionResponse() != null &&
                response.getTransactionResponse().getErrors() != null
              ) {
                console.log(
                  'Error Code: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorCode(),
                );
                console.log(
                  'Error message: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText(),
                );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();            
              } else {
                console.log(
                  'Error Code: ' +
                    response.getMessages().getMessage()[0].getCode(),
                );
                console.log(
                  'Error message: ' +
                    response.getMessages().getMessage()[0].getText(),
                );
                res.responseText = response?.getMessages()?.getMessage()[0]?.getText();
              }
              reject(res);
            }
          } else {
            reject(res);
          }
        });
      });
      return apiResponse;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
      return res;
    }
  }

  async refundTransaction(invoiceData: InvoicePayment, authorizePaymentConfigCms,totalAmount,transactionId): Promise<any> {
    const res = {
      responseText: 'fail',
      responseCode: 101,
      transactionId: '',
      transRes: {},
    };
    const apiLoginKey = authorizePaymentConfigCms?.api_login_id;
    const transactionKey = authorizePaymentConfigCms?.transaction_key;
    const account_status = authorizePaymentConfigCms?.account_status;
    const merchantAuthenticationType =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginKey);
    merchantAuthenticationType.setTransactionKey(
      transactionKey
    );
    const paymentPayload : InvoicePaymentPayloadInterface = invoiceData.paymentPayload;
    let expiryMonthYear=paymentPayload?.cardPayload?.expirationdate;
    if(expiryMonthYear?.length==5){
      const dataYM = expiryMonthYear?.split('/');
      expiryMonthYear = `20${dataYM[1]}-${dataYM[0]}`;
    }
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(paymentPayload?.cardPayload?.cardnumber);
    creditCard.setExpirationDate(expiryMonthYear);
    creditCard.setCardCode(paymentPayload?.cardPayload?.securitycode);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);


    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      APIContracts.TransactionTypeEnum.REFUNDTRANSACTION,
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalAmount);
    transactionRequestType.setRefTransId(transactionId);
  

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(
      createRequest.getJSON(),
    );
    
    if(account_status==='PRODUCTION'){
      ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

    try {
      const apiResponse = await new Promise((resolve, reject) => {
        ctrl.execute(function () {
          const apiResponse = ctrl.getResponse();
          const response = new APIContracts.CreateTransactionResponse(
            apiResponse,
          );

          //pretty print response
          //console.log('api response : ', JSON.stringify(response, null, 2));

          if (response != null) {
            if (
              response.getMessages().getResultCode() ==
              APIContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() != null) {
                res.transactionId = response
                  ?.getTransactionResponse()
                  ?.getTransId();
                res.responseCode = 100;
                res.responseText = 'success';
                console.log(
                  'Successfully created transaction with Transaction ID: ' +
                    response.getTransactionResponse().getTransId(),
                );
                const transRes = {
                  responseCode: response
                    ?.getTransactionResponse()
                    ?.getResponseCode(),
                  messageCode: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getCode(),
                  description: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getDescription(),
                };
                res.transRes = transRes;
                console.log(
                  'Response Code: ' +
                    response.getTransactionResponse().getResponseCode(),
                );
                console.log(
                  'Message Code: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getCode(),
                );
                console.log(
                  'Description: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getDescription(),
                );
                resolve(res);
              } else {
                console.log('Failed Transaction.');
                if (response.getTransactionResponse().getErrors() != null) {
                  console.log(
                    'Error Code: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorCode(),
                  );
                  console.log(
                    'Error message: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorText(),
                  );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();
              
                }
                reject(res);
              }
            } else {
              console.log('Failed Transaction. ');
              if (
                response.getTransactionResponse() != null &&
                response.getTransactionResponse().getErrors() != null
              ) {
                console.log(
                  'Error Code: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorCode(),
                );
                console.log(
                  'Error message: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText(),
                );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();            
              } else {
                console.log(
                  'Error Code: ' +
                    response.getMessages().getMessage()[0].getCode(),
                );
                console.log(
                  'Error message: ' +
                    response.getMessages().getMessage()[0].getText(),
                );
                res.responseText = response?.getMessages()?.getMessage()[0]?.getText();
              }
              reject(res);
            }
          } else {
            reject(res);
          }
        });
      });
      return apiResponse;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
      return res;
    }
  }

  async voidTransaction(invoiceData: InvoicePayment, authorizePaymentConfigCms,totalAmount,transactionId): Promise<any> {
    const res = {
      responseText: 'fail',
      responseCode: 101,
      transactionId: '',
      transRes: {},
    };
    //const randomNumber = generateRandomNumber(9);
    const apiLoginKey = authorizePaymentConfigCms?.api_login_id;
    const transactionKey = authorizePaymentConfigCms?.transaction_key;
    const account_status = authorizePaymentConfigCms?.account_status;
    const merchantAuthenticationType =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginKey);
    merchantAuthenticationType.setTransactionKey(
      transactionKey
    );
    const paymentPayload : InvoicePaymentPayloadInterface = invoiceData.paymentPayload;
    let expiryMonthYear=paymentPayload?.cardPayload?.expirationdate;
    if(expiryMonthYear?.length==5){
      const dataYM = expiryMonthYear?.split('/');
      expiryMonthYear = `20${dataYM[1]}-${dataYM[0]}`;
    }
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(paymentPayload?.cardPayload?.cardnumber);
    creditCard.setExpirationDate(expiryMonthYear);
    creditCard.setCardCode(paymentPayload?.cardPayload?.securitycode);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);


    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      APIContracts.TransactionTypeEnum.VOIDTRANSACTION,
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalAmount);
    transactionRequestType.setRefTransId(transactionId);
  

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(
      createRequest.getJSON(),
    );
    
    if(account_status==='PRODUCTION'){
      ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

    try {
      const apiResponse = await new Promise((resolve, reject) => {
        ctrl.execute(function () {
          const apiResponse = ctrl.getResponse();
          const response = new APIContracts.CreateTransactionResponse(
            apiResponse,
          );

          //pretty print response
          //console.log('api response : ', JSON.stringify(response, null, 2));

          if (response != null) {
            if (
              response.getMessages().getResultCode() ==
              APIContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() != null) {
                res.transactionId = response
                  ?.getTransactionResponse()
                  ?.getTransId();
                res.responseCode = 100;
                res.responseText = 'success';
                console.log(
                  'Successfully created transaction with Transaction ID: ' +
                    response.getTransactionResponse().getTransId(),
                );
                const transRes = {
                  responseCode: response
                    ?.getTransactionResponse()
                    ?.getResponseCode(),
                  messageCode: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getCode(),
                  description: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getDescription(),
                };
                res.transRes = transRes;
                console.log(
                  'Response Code: ' +
                    response.getTransactionResponse().getResponseCode(),
                );
                console.log(
                  'Message Code: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getCode(),
                );
                console.log(
                  'Description: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getDescription(),
                );
                resolve(res);
              } else {
                console.log('Failed Transaction.');
                if (response.getTransactionResponse().getErrors() != null) {
                  console.log(
                    'Error Code: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorCode(),
                  );
                  console.log(
                    'Error message: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorText(),
                  );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();
              
                }
                reject(res);
              }
            } else {
              console.log('Failed Transaction. ');
              if (
                response.getTransactionResponse() != null &&
                response.getTransactionResponse().getErrors() != null
              ) {
                console.log(
                  'Error Code: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorCode(),
                );
                console.log(
                  'Error message: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText(),
                );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();            
              } else {
                console.log(
                  'Error Code: ' +
                    response.getMessages().getMessage()[0].getCode(),
                );
                console.log(
                  'Error message: ' +
                    response.getMessages().getMessage()[0].getText(),
                );
                res.responseText = response?.getMessages()?.getMessage()[0]?.getText();
              }
              reject(res);
            }
          } else {
            reject(res);
          }
        });
      });
      return apiResponse;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
      return res;
    }
  }



}
