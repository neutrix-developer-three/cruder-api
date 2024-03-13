import { PartialType } from "@nestjs/mapped-types";
import { BaseAboutPageBannerCMSDto } from "./base-about-page-banner-cms.dto";

export class UpdateAboutPageBannerCMSDto extends PartialType(BaseAboutPageBannerCMSDto) {
}