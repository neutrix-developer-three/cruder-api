import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseOurProcessVideoCmsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    subtitle: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    short_detail: string;

    @IsNotEmpty()
    video_link: string;

}

