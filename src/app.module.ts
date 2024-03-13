import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import JwtConfigService from './core/jwt/jwt-config.service';
import { AboutPageBannerCMSModule } from './modules/CMS/about-page-banner-cms/about-page-banner-cms.module';
import { CategoryModule } from './modules/CRUD/category/category.module';
import { UsersSchema } from './modules/CRUD/users/schema/users.schema';
import { UsersModule } from './modules/CRUD/users/users.module';
import { DoSpacesServicerovider } from './modules/SpacesModule/SpacesService';
import { DoSpacesService } from './modules/SpacesModule/SpacesService/doSpacesService';
import { SpacesModule } from './modules/SpacesModule/spaces.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileUploadsModule } from './modules/file-uploads/file-uploads.module';
import { FileUploadsService } from './modules/file-uploads/file-uploads.service';
import { SiteFrontendModule } from './modules/site-frontend/site-frontend.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { SharedGlobalModule } from './shared-global.module';
import { SiteSettingsCmsModule } from './modules/CMS/SiteSetting/site-settings-cms/site-settings-cms.module';
import { SalesTaxCmsModule } from './modules/CMS/SiteSetting/sales-tax/sales-tax-cms.module';
import { PrivacyPolicyCmsModule } from './modules/CMS/SiteSetting/privacy-policy-cms/privacy-policy-cms.module';
import { ReturnsCmsModule } from './modules/CMS/SiteSetting/returns-cms/returns-cms.module';
import { ShippingCmsModule } from './modules/CMS/SiteSetting/shipping-cms/shipping-cms.module';
import { TermsConditionsCmsModule } from './modules/CMS/SiteSetting/terms-conditions-cms/terms-conditions-cms.module';
import { SecretKeyCmsModule } from './modules/CMS/SiteSetting/secret-key-cms/secret-key-cms.module';
import { AuthorizePaymentConfigCmsModule } from './modules/CMS/SiteSetting/authorize-payment-config-cms/authorize-payment-config-cms.module';
import { CartCmsModule } from './modules/CMS/SiteSetting/cart-cms/cart-cms.module';
import { SiteTitleCmsModule } from './modules/CMS/SEO/site-title-cms/site-title-cms.module';
import { ReturnPageCmsModule } from './modules/CMS/SEO/return-page-cms/retrun-page-cms.module';
import { PrivacyPolicyPageCmsModule } from './modules/CMS/SEO/privacy-policy-page-cms/privacy-policy-page-cms.module';
import { ShippingPageCmsModule } from './modules/CMS/SEO/shipping-page-cms/shipping-page-cms.module';
import { TermsConditionPageCmsModule } from './modules/CMS/SEO/terms-condition-page-cms/terms-condition-page-cms.module';
import { FaqMetaCmsModule } from './modules/CMS/SEO/faq-meta-cms/faq-meta-cms.module';
import { AboutUsCmsModule } from './modules/AboutPage/about-us-cms/about-us-cms.module';
import { WhyChooseUsCmsModule } from './modules/AboutPage/why-choose-us-cms/why-choose-us-cms.module';
import { WhyChooseUsFeaturesModule } from './modules/AboutPage/why-choose-us-features/why-choose-us-features.module';
import { AboutUsOfferModule } from './modules/AboutPage/about-us-offer/about-us-offer.module';
import { AboutUsPageCmsModule } from './modules/AboutPage/about-us-page-cms/about-us-page-cms.module';
import { BlogModule } from './modules/Blog/blog/blog.module';
import { BlogPageCmsModule } from './modules/Blog/blog-page-cms/blog-page-cms.module';
import { FaqModule } from './modules/Faq/faq/faq.module';
import { FaqPageCmsModule } from './modules/Faq/faq-page-cms/faq-page-cms.module';
import { OurProcessVideoCmsModule } from './modules/OurProcess/our-process-video-cms/our-process-video-cms.module';
import { OurProcessPageCmsModule } from './modules/OurProcess/our-process-page-cms/our-process-page-cms.module';
import { OurProcessServiceOneModule } from './modules/OurProcess/our-process-service-one/our-process-service-one.module';
import { OurProcessServiceTwoModule } from './modules/OurProcess/our-process-service-two/our-process-service-two.module';
import { ContactUsCmsModule } from './modules/ContactUs/contact-us-page-cms/contact-us-cms.module';
import { ContactUsModule } from './modules/ContactUs/contact-us/contact-us.module';
import { ProductCategoryModule } from './modules/Product/product-category/product-category.module';
import { ProductTagModule } from './modules/Product/product-tag/product-tag.module';
import { ProductPageCmsModule } from './modules/Product/product-page-cms/product-page-cms.module';
import { ProductCategoryFaqModule } from './modules/Product/product-category-faq/product-category-faq.module';
import { ProductModule } from './modules/Product/product/product.module';
import { ProductFaqModule } from './modules/Product/product-faq/product-faq.module';
import { OfferProductModule } from './modules/Product/offer-product/offer-product.module';
import { HeroSectionCmsModule } from './modules/Home/hero-section-cms/hero-section-cms.module';
import { HomeIntroModule } from './modules/Home/home-intro/home-intro.module';
import { HomeVideoModule } from './modules/Home/home-video/home-video.module';
import { HomeInstagramModule } from './modules/Home/home-instagrams/home-instagram.module';
import { HomeAboutCmsModule } from './modules/Home/home-about-cms/home-about-cms.module';
import { HomeEchoCmsModule } from './modules/Home/home-echo-cms/home-echo-cms.module';
import { HomeGalleryModule } from './modules/Home/home-gallery/home-gallery.module';
import { HomePageCmsModule } from './modules/Home/home-page-cms/home-page-cms.module';
import { HomeTestimonialsModule } from './modules/Home/home-testimonials/home-testimonials.module';
import { HomeProgressWrapsModule } from './modules/Home/home-progress-wraps/home-progress-wraps.module';
import { HomeSubscribeCmsModule } from './modules/Home/home-subscribe-cms/home-subscribe-cms.module';
import { HomePageUiCmsModule } from './modules/HomeComponentUI/home-page-ui-cms/home-page-ui-cms.module';
import { ProductComponentUiCmsModule } from './modules/HomeComponentUI/product-component-ui-cms/product-component-ui-cms.module';
import { ProductDetailsComponentUiCmsModule } from './modules/HomeComponentUI/product-details-component-ui-cms/product-details-component-ui-cms.module';
import { AboutComponentUiCmsModule } from './modules/HomeComponentUI/about-component-ui-cms/about-component-ui-cms.module';
import { ProductReviewModule } from './modules/Product/product-review/product-review.module';
import { OurProcessComponentUiCmsModule } from './modules/HomeComponentUI/our-process-component-ui-cms/our-process-component-ui-cms.module';
import { ContactPageComponentUiCmsModule } from './modules/HomeComponentUI/contact-page-component-ui-cms/contact-page-component-ui-cms.module';
import { BlogPageComponentUiCmsModule } from './modules/HomeComponentUI/blog-page-component-ui-cms/blog-page-component-ui-cms.module';
import { SubscribePageComponentUiCmsModule } from './modules/HomeComponentUI/subscribe-page-component-ui-cms/subscribe-page-component-ui-cms.module';
import { CartPageComponentUiCmsModule } from './modules/HomeComponentUI/cart-page-component-ui-cms/cart-page-component-ui-cms.module';
import { OrderModule } from './modules/Order/order.module';
import { CouponModule } from './modules/Coupon/coupon.module';
import { MailSenderModule } from './modules/mail-sender/mail-sender.module';
import { SubscribeEmailModule } from './modules/SubscribeEmail/subscribe-email.module';
import { PromotionalPopupCmsModule } from './modules/PopupModal/promotional-popup-cms/promotional-popup-cms.module';
import { NewsletterPopupCmsModule } from './modules/PopupModal/newsletter-popup-cms/newsletter-popup-cms.module';
import { UserSiteFrontendModule } from './modules/UserSiteFrontend/user-site-frontend.module';
import { DashboardModule } from './modules/Dashboard/dashboard.module';
import { ProductMetaCmsModule } from './modules/CMS/SEO/product-meta-cms/product-meta-cms.module';
import { ProductCategoryMetaCmsModule } from './modules/CMS/SEO/product-category-meta-cms/product-category-meta-cms.module';
import { BlogMetaCmsModule } from './modules/CMS/SEO/blog-meta-cms/blog-meta-cms.module';
import { AdminOrderModule } from './modules/AdminOrder/admin-order.module';
import { ProductReturnModule } from './modules/Product/product-return/product-return.module';
import { PaymentModule } from './modules/PaymentModule/payment.module';
import { ReportModule } from './modules/Reports/report.module';
import { LogActivityModule } from './modules/LogActivity/log-activity.module';
import { CodeGenerationModule } from './modules/Code-Generation/code-generation.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT),
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            },
            defaults: {
                from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_SENDER_MAIL}>`,
            },
            template: {
                dir: `${process.cwd()}`,
                // dir: `${process.cwd()}/templates`,
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        FileUploadsModule,
        SpacesModule,
        MailSenderModule,
        UsersModule,
        AuthModule,
        CategoryModule,
        SiteFrontendModule,
        AboutPageBannerCMSModule,
        RbacModule,
        SharedGlobalModule,
        SiteSettingsCmsModule,
        SalesTaxCmsModule,
        PrivacyPolicyCmsModule,
        ReturnsCmsModule,
        ShippingCmsModule,
        TermsConditionsCmsModule,
        SecretKeyCmsModule,
        AuthorizePaymentConfigCmsModule,
        CartCmsModule,
        SiteTitleCmsModule,
        ReturnPageCmsModule,
        PrivacyPolicyPageCmsModule,
        ShippingPageCmsModule,
        TermsConditionPageCmsModule,
        FaqMetaCmsModule,
        AboutUsCmsModule,
        WhyChooseUsCmsModule,
        WhyChooseUsFeaturesModule,
        AboutUsOfferModule,
        AboutUsPageCmsModule,
        BlogModule,
        BlogPageCmsModule,
        FaqModule,
        FaqPageCmsModule,
        OurProcessVideoCmsModule,
        OurProcessPageCmsModule,
        OurProcessServiceOneModule,
        OurProcessServiceTwoModule,
        ContactUsCmsModule,
        ContactUsModule,
        ProductCategoryModule,
        ProductTagModule,
        ProductPageCmsModule,
        ProductCategoryFaqModule,
        ProductModule,
        ProductFaqModule,
        OfferProductModule,
        HeroSectionCmsModule,
        HomeIntroModule,
        HomeVideoModule,
        HomeInstagramModule,
        HomeAboutCmsModule,
        HomeEchoCmsModule,
        HomeGalleryModule,
        HomePageCmsModule,
        HomeTestimonialsModule,
        HomeProgressWrapsModule,
        HomeSubscribeCmsModule,
        HomePageUiCmsModule,
        ProductComponentUiCmsModule,
        ProductDetailsComponentUiCmsModule,
        AboutComponentUiCmsModule,
        ProductReviewModule,
        OurProcessComponentUiCmsModule,
        ContactPageComponentUiCmsModule,
        BlogPageComponentUiCmsModule,
        SubscribePageComponentUiCmsModule,
        CartPageComponentUiCmsModule,
        OrderModule,
        CouponModule,
        SubscribeEmailModule,
        PromotionalPopupCmsModule,
        NewsletterPopupCmsModule,
        UserSiteFrontendModule,
        DashboardModule,
        ProductMetaCmsModule,
        ProductCategoryMetaCmsModule,
        BlogMetaCmsModule,
        AdminOrderModule,
        ProductReturnModule,
        PaymentModule,
        ReportModule,
        LogActivityModule,
        CodeGenerationModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        FileUploadsService,
        DoSpacesService,
        DoSpacesServicerovider
    ]
})
export class AppModule { }