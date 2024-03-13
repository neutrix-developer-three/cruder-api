import { PartialType } from '@nestjs/mapped-types';
import { BaseNewsletterPopupCmsDto } from './base-newsletter-popup-cms.dto';

export class UpdateNewsletterPopupCmsDto extends PartialType(BaseNewsletterPopupCmsDto) {}
