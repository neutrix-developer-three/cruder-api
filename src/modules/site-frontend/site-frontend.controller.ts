import { Controller, Get, Param, Query } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { SiteFrontendService } from "./site-frontend.service";
import { FilterDto } from 'src/core/filter.dto';

@Controller({
    path: "site",
    version: Constants.API_VERSION_1
})
export class SiteFrontendController {
    constructor(private readonly service: SiteFrontendService) { }

    @Get('/common-cms')
    async getCommonCMSData() {
        return await this.service.getCommonCMSData();
    }

    @Get('/meta-data')
    async getMetaData() {
        return await this.service.getMetaData();
    }

    @Get('/home-page')
    async getHomePageData() {
        return await this.service.getHomePageData();
    }

    @Get('/about-us-page')
    async getAboutUsPageData() {
        return await this.service.getAboutUsPageData();
    }

    @Get('/our-process-page')
    async getOurProcessPageData() {
        return await this.service.getOurProcessPageData();
    }


    @Get('/contact-us-page')
    async getContactUsPageData() {
        return await this.service.getContactUsPageData();
    }

    @Get('/obd-shop-page/:slug')
    async getObdShopPageData(@Param("slug") slug: string) {
        return await this.service.getObdShopPageData(slug);
    }
    @Get('/obd-shop-page-meta-data/:slug')
    async getObdShopPageMetaData(@Param("slug") slug: string) {
        return await this.service.getObdShopPageMetaData(slug);
    }

    @Get('/obd-shop')
    async getObdShopData() {
        return await this.service.getObdShopData();
    }

    @Get('/cart-page')
    async getCartPageData() {
        return await this.service.getCartPageData();
    }
    

    @Get('/sales-tax-cms')
    async getSalesTaxCMSData() {
        return await this.service.getSalesTaxCMSData();
    }

    @Get('/popup-modal-page/:pageType')
    async getPopupModalCMSData(@Param("pageType") pageType: string) {
        return await this.service.getPopupModalCMSData(pageType);
    }

    @Get('/terms-and-conditions')
    async getTermsAndConditionCMSData() {
        return await this.service.getTermsAndConditionCMSData();
    }

    @Get('/privacy')
    async getPrivacyCMSData() {
        return await this.service.getPrivacyCMSData();
    }

    @Get('/return')
    async getReturnCMSData() {
        return await this.service.getReturnCMSData();
    }

    @Get('/shipping')
    async getShippingCMSData() {
        return await this.service.getShippingCMSData();
    }

    @Get('/faq')
    async getFaqData() {
        return await this.service.getFaqData();
    }

    @Get('/blog')
    async getBlogData(@Query() filterDto:FilterDto) {
        return await this.service.getBlogData(filterDto);
    }
    @Get('/blog/:slug')
    async getBlogDetailsData(@Param("slug") slug: string) {
        return await this.service.getBlogDetailsData(slug);
    }
    @Get('/cart-summary-discount-and-sales-tax')
    async getCartSummaryData() {
        return await this.service.getCartSummaryData();
    }

    @Get('/get-populate-product/:id')
    async getPopulateProductData(@Param("id") id: string) {
        return await this.service.getPopulateProductData(id);
    }



}     
