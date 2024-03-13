import { PartialType } from "@nestjs/mapped-types";
import { CreateOfferProductDto } from "./create-offer-product.dto";

export class UpdateOfferProductDto extends PartialType(CreateOfferProductDto) { }