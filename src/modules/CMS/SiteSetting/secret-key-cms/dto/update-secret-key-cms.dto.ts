import { PartialType } from '@nestjs/mapped-types';
import { BaseSecretKeyCmsDto } from './base-secret-key-cms.dto';

export class UpdateSecretKeyCmsDto extends PartialType(BaseSecretKeyCmsDto) {}
