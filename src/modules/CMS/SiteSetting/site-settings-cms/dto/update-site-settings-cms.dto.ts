import { PartialType } from '@nestjs/mapped-types';
import { BaseSiteSettingsCmDto } from './base-site-settings-cms.dto';

export class UpdateSiteSettingsCmDto extends PartialType(BaseSiteSettingsCmDto) {}
