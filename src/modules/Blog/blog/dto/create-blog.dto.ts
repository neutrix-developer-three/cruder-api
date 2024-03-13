import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    short_detail: string;

    @IsNotEmpty()
    long_detail: string;

    @IsNotEmpty()
    author_name: string;

    @IsOptional()
    slug: string;

    @IsOptional()
    isPublish: string;

    @IsOptional()
    image_alt_text: string;
}
