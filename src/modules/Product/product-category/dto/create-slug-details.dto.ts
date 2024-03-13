import { IsOptional } from "class-validator";


export class CreateSlugDetailsDto {
    @IsOptional()
    slug: string;

    @IsOptional()
    slug_id: string;

    @IsOptional()
    type: string;

}
