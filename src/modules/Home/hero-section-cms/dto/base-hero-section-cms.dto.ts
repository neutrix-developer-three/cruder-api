import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseHeroSectionCmsDto {
    @IsOptional()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    button_text: string;

    @IsOptional()
    button_link: string;

}
