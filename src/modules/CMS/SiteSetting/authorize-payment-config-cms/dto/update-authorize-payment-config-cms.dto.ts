import { PartialType } from '@nestjs/mapped-types';
import { BaseAuthorizePaymentConfigCmsDto } from './base-authorize-payment-config-cms.dto';

export class UpdateAuthorizePaymentConfigCmsDto extends PartialType(BaseAuthorizePaymentConfigCmsDto) {}
