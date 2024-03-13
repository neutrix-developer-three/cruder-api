import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCouponLogDto {
  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  user_name: string;

  @IsOptional()
  order_id: string;
  
  
}
