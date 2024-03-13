import { PartialType } from '@nestjs/mapped-types';
import { BasePromotionalPopupCmsDto } from './base-promotional-popup-cms.dto';

export class UpdatePromotionalPopupCmsDto extends PartialType(BasePromotionalPopupCmsDto) {}
