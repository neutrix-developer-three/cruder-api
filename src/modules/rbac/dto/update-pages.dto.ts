import { PartialType } from '@nestjs/mapped-types';
import { CreatePagesDto } from './create-pages.dto';

export class UpdatePagesDto extends PartialType(CreatePagesDto) {}
