import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtHelper from 'src/core/jwt/jwt.helper';


import { MongooseModule } from '@nestjs/mongoose';
import { AboutPageBannerCMSSchema } from '../CMS/about-page-banner-cms/schema/about-page-banner-cms.schema';
import { CategorySchema } from '../CRUD/category/schema/category.schema';
import { UsersSchema } from '../CRUD/users/schema/users.schema';
import { SiteFrontendController } from './site-frontend.controller';
import { SiteFrontendService } from './site-frontend.service';
import { SiteSettingsCmsSchema } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { ProductCategorySchema } from '../Product/product-category/schema/product-category.schema';
import { AboutUsCmsSchema } from '../AboutPage/about-us-cms/schema/about-us-cms.schema';
import { AboutUsOfferSchema } from '../AboutPage/about-us-offer/schema/about-us-offer.schema';
import { AboutUsPageCmsSchema } from '../AboutPage/about-us-page-cms/schema/about-us-page-cms.schema';
import { WhyChooseUsCmsSchema } from '../AboutPage/why-choose-us-cms/schema/why-choose-us-cms.schema';
import { WhyChooseUsFeaturesSchema } from '../AboutPage/why-choose-us-features/schema/why-choose-us-features.schema';
import { ContactUsSchema } from '../ContactUs/contact-us/schema/contact-us.schema';
import { ContactUsCmsSchema } from '../ContactUs/contact-us-page-cms/schema/contact-us-cms.schema';
import { OurProcessPageCmsSchema } from '../OurProcess/our-process-page-cms/schema/our-process-page-cms.schema';
import { OurProcessServiceOneSchema } from '../OurProcess/our-process-service-one/schema/our-process-service-one.schema';
import { OurProcessServiceTwoSchema } from '../OurProcess/our-process-service-two/schema/our-process-service-two.schema';
import { OurProcessVideoCmsSchema } from '../OurProcess/our-process-video-cms/schema/our-process-video-cms.schema';
import { HeroSectionCmsSchema } from '../Home/hero-section-cms/schema/hero-section-cms.schema';
import { HomeAboutCmsSchema } from '../Home/home-about-cms/schema/home-about-cms.schema';
import { HomeEchoCmsSchema } from '../Home/home-echo-cms/schema/home-echo-cms.schema';
import { HomeGallerySchema } from '../Home/home-gallery/schema/home-gallery.schema';
import { HomeInstagramSchema } from '../Home/home-instagrams/schema/home-instagram.schema';
import { HomeIntroSchema } from '../Home/home-intro/schema/home-intro.schema';
import { HomePageCmsSchema } from '../Home/home-page-cms/schema/home-page-cms.schema';
import { HomeProgressWrapsSchema } from '../Home/home-progress-wraps/schema/home-progress-wraps.schema';
import { HomeSubscribeCmsSchema } from '../Home/home-subscribe-cms/schema/home-subscribe-cms.schema';
import { HomeTestimonialsSchema } from '../Home/home-testimonials/schema/home-testimonials.schema';
import { HomeVideoSchema } from '../Home/home-video/schema/home-video.schema';
import { ProductSchema } from '../Product/product/schema/product.schema';
import { ProductCategoryFaqSchema } from '../Product/product-category-faq/schema/product-category-faq.schema';
import { ProductFaqSchema } from '../Product/product-faq/schema/product-faq.schema';
import { ProductReviewSchema } from '../Product/product-review/schema/product-review.schema';
import { OfferProductSchema } from '../Product/offer-product/schema/offer-product.schema';
import { BlogSchema } from '../Blog/blog/schema/blog.schema';
import { ProductTagSchema } from '../Product/product-tag/schema/product-tag.schema';
import { ProductComponentUiCmsSchema } from '../HomeComponentUI/product-component-ui-cms/schema/product-component-ui-cms.schema';
import { ProductDetailsComponentUiCmsSchema } from '../HomeComponentUI/product-details-component-ui-cms/schema/product-details-component-ui-cms.schema';
import { ProductPageCmsSchema } from '../Product/product-page-cms/schema/product-page-cms.schema';
import { ContactPageComponentUiCmsSchema } from '../HomeComponentUI/contact-page-component-ui-cms/schema/contact-page-component-ui-cms.schema';
import { HomePageUiCmsSchema } from '../HomeComponentUI/home-page-ui-cms/schema/home-page-ui-cms.schema';
import { SalesTaxCmsSchema } from '../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema';
import { PromotionalPopupCmsSchema } from '../PopupModal/promotional-popup-cms/schema/promotional-popup-cms.schema';
import { PopupModalPageSchema } from '../PopupModal/promotional-popup-cms/schema/popup-modal-page.schema';
import { NewsletterPopupCmsSchema } from '../PopupModal/newsletter-popup-cms/schema/newsletter-popup-cms.schema';
import { TermsConditionsCmsSchema } from '../CMS/SiteSetting/terms-conditions-cms/schema/terms-conditions-cms.schema';
import { TermsConditionPageCmsSchema } from '../CMS/SEO/terms-condition-page-cms/schema/terms-condition-page-cms.schema';
import { PrivacyPolicyCmsSchema } from '../CMS/SiteSetting/privacy-policy-cms/schema/privacy-policy-cms.schema';
import { PrivacyPolicyPageCmsSchema } from '../CMS/SEO/privacy-policy-page-cms/schema/privacy-policy-page-cms.schema';
import { ReturnsCmsSchema } from '../CMS/SiteSetting/returns-cms/schema/returns-cms.schema';
import { ReturnPageCmsSchema } from '../CMS/SEO/return-page-cms/schema/return-page-cms.schema';
import { ShippingCmsSchema } from '../CMS/SiteSetting/shipping-cms/schema/shipping-cms.schema';
import { ShippingPageCmsSchema } from '../CMS/SEO/shipping-page-cms/schema/shipping-page-cms.schema';
import { FaqMetaCmsSchema } from '../CMS/SEO/faq-meta-cms/schema/faq-meta-cms.schema';
import { FaqSchema } from '../Faq/faq/schema/faq.schema';
import { FaqPageCmsSchema } from '../Faq/faq-page-cms/schema/faq-page-cms.schema';
import { BlogPageCmsSchema } from '../Blog/blog-page-cms/schema/blog-page-cms.schema';
import { BlogPageComponentUiCmsSchema } from '../HomeComponentUI/blog-page-component-ui-cms/schema/blog-page-component-ui-cms.schema';
import { ProductMetaCmsSchema } from '../CMS/SEO/product-meta-cms/schema/product-meta-cms.schema';
import { ProductCategoryMetaCmsSchema } from '../CMS/SEO/product-category-meta-cms/schema/product-category-meta-cms.schema';
import { BlogMetaCmsSchema } from '../CMS/SEO/blog-meta-cms/schema/blog-meta-cms.schema';
import { CouponSchema } from '../Coupon/schema/coupon.schema';
import { SlugDetailsSchema } from '../Product/product-category/schema/slug-details.schema';
import { OurProcessComponentUiCmsSchema } from '../HomeComponentUI/our-process-component-ui-cms/schema/our-process-component-ui-cms.schema';
import { AboutComponentUiCmsSchema } from '../HomeComponentUI/about-component-ui-cms/schema/about-component-ui-cms.schema';
import { CartCmsSchema } from '../CMS/SiteSetting/cart-cms/schema/cart-cms.schema';
import { CartPageComponentUiCmsSchema } from '../HomeComponentUI/cart-page-component-ui-cms/schema/cart-page-component-ui-cms.schema';
@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),

        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'site_settings_cms', schema: SiteSettingsCmsSchema },
            { name: 'product_categories', schema: ProductCategorySchema },
            { name: 'about_us_cms', schema: AboutUsCmsSchema },
            { name: 'about_us_offer', schema: AboutUsOfferSchema },
            { name: 'about_us_page_cms', schema: AboutUsPageCmsSchema },
            { name: 'about_why_choose_us_cms', schema: WhyChooseUsCmsSchema },
            { name: 'about_why_choose_us_features', schema: WhyChooseUsFeaturesSchema },
            { name: 'contact_us', schema: ContactUsSchema },
            { name: 'contact_us_cms', schema: ContactUsCmsSchema },
            { name: 'our_process_page_cms', schema: OurProcessPageCmsSchema },
            { name: 'our_process_service_one', schema: OurProcessServiceOneSchema },
            { name: 'our_process_service_two', schema: OurProcessServiceTwoSchema },
            { name: 'our_process_video_cms', schema: OurProcessVideoCmsSchema },
            { name: 'hero_section_cms', schema: HeroSectionCmsSchema },
            { name: 'home_about_cms', schema: HomeAboutCmsSchema },
            { name: 'home_echo_cms', schema: HomeEchoCmsSchema },
            { name: 'home_gallery', schema: HomeGallerySchema },
            { name: 'home_instagram', schema: HomeInstagramSchema },
            { name: 'home_intro', schema: HomeIntroSchema },
            { name: 'home_page_cms', schema: HomePageCmsSchema },
            { name: 'home_progress_wraps', schema: HomeProgressWrapsSchema },
            { name: 'home_subscribe_cms', schema: HomeSubscribeCmsSchema },
            { name: 'home_testimonials', schema: HomeTestimonialsSchema },
            { name: 'home_video', schema: HomeVideoSchema },
            { name: 'offer_product', schema: OfferProductSchema },
            { name: 'blogs', schema: BlogSchema },
            { name: 'products', schema: ProductSchema },
            { name: 'product_category_faq', schema: ProductCategoryFaqSchema },
            { name: 'product_faq', schema: ProductFaqSchema },
            { name: 'product_review', schema: ProductReviewSchema },
            { name: 'product_tag', schema: ProductTagSchema },
            { name: 'product_component_ui_cms', schema: ProductComponentUiCmsSchema },
            { name: 'product_details_component_ui_cms', schema: ProductDetailsComponentUiCmsSchema },
            { name: 'product_page_cms', schema: ProductPageCmsSchema },
            { name: 'contact_page_component_ui_cms', schema: ContactPageComponentUiCmsSchema },
            { name: 'home_page_ui_cms', schema: HomePageUiCmsSchema },
            { name: 'sales_taxes', schema: SalesTaxCmsSchema },
            { name: 'promotional_popup_cms', schema: PromotionalPopupCmsSchema },
            { name: 'newsletter_popup_cms', schema: NewsletterPopupCmsSchema },
            { name: 'terms_conditions_cms', schema: TermsConditionsCmsSchema },
            { name: 'seo_terms_condition_page_cms', schema: TermsConditionPageCmsSchema },
            { name: 'privacy_policy_cms', schema: PrivacyPolicyCmsSchema },
            { name: 'seo_privacy_policy_page_cms', schema: PrivacyPolicyPageCmsSchema },
            { name: 'returns_cms', schema: ReturnsCmsSchema },
            { name: 'seo_return_page_cms', schema: ReturnPageCmsSchema },
            { name: 'shipping_cms', schema: ShippingCmsSchema },
            { name: 'seo_shipping_page_cms', schema: ShippingPageCmsSchema },
            { name: 'seo_faq_meta_cms', schema: FaqMetaCmsSchema },
            { name: 'faqs', schema: FaqSchema },
            { name: 'faq_page_cms', schema: FaqPageCmsSchema },
            { name: 'blog_page_cms', schema: BlogPageCmsSchema },
            { name: 'blog_page_component_ui_cms', schema: BlogPageComponentUiCmsSchema },
            { name: 'product_meta_cms', schema: ProductMetaCmsSchema },
            { name: 'product_category_meta_cms', schema: ProductCategoryMetaCmsSchema },
            { name: 'blog_meta_cms', schema: BlogMetaCmsSchema },
            { name: 'coupons', schema: CouponSchema },
            { name: 'slug_details', schema: SlugDetailsSchema },
            { name: 'our_process_component_ui_cms', schema: OurProcessComponentUiCmsSchema },
            { name: 'about_component_ui_cms', schema: AboutComponentUiCmsSchema },
            { name: 'cart_cms', schema: CartCmsSchema },
            { name: 'cart_page_component_ui_cms', schema: CartPageComponentUiCmsSchema }

        ]),
    ],
    controllers: [SiteFrontendController],
    providers: [SiteFrontendService, JwtHelper]
})

export class SiteFrontendModule { }
