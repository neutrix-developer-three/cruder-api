import { PartialType } from "@nestjs/mapped-types";
import { CreateAboutUsOfferDto } from "./create-about-us-offer.dto";

export class UpdateAboutUsOfferDto extends PartialType(CreateAboutUsOfferDto) { }