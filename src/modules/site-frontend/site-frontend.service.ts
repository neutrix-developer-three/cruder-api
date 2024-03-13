import { ProductTagRepository } from './../Product/product-tag/product-tag.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { ProductCategory } from '../Product/product-category/schema/product-category.schema';
import { ProductCategoryRepository } from '../Product/product-category/product-category.repository';
import { SiteSettingsCms } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { SiteSettingsCmsRepository } from '../CMS/SiteSetting/site-settings-cms/site-settings-cms-repository';
import { AboutUsCms } from '../AboutPage/about-us-cms/schema/about-us-cms.schema';
import { AboutUsCmsRepository } from '../AboutPage/about-us-cms/about-us-cms-repository';
import { AboutUsOffer } from '../AboutPage/about-us-offer/schema/about-us-offer.schema';
import { AboutUsOfferRepository } from '../AboutPage/about-us-offer/about-us-offer.repository';
import { AboutUsPageCms } from '../AboutPage/about-us-page-cms/schema/about-us-page-cms.schema';
import { AboutUsPageCmsRepository } from '../AboutPage/about-us-page-cms/about-us-page-cms-repository';
import { WhyChooseUsCms } from '../AboutPage/why-choose-us-cms/schema/why-choose-us-cms.schema';
import { WhyChooseUsCmsRepository } from '../AboutPage/why-choose-us-cms/why-choose-us-cms-repository';
import { WhyChooseUsFeatures } from '../AboutPage/why-choose-us-features/schema/why-choose-us-features.schema';
import { WhyChooseUsFeaturesRepository } from '../AboutPage/why-choose-us-features/why-choose-us-features.repository';
import { ContactUs } from '../ContactUs/contact-us/schema/contact-us.schema';
import { ContactUsRepository } from '../ContactUs/contact-us/contact-us.repository';
import { ContactUsCms } from '../ContactUs/contact-us-page-cms/schema/contact-us-cms.schema';
import { ContactUsCmsRepository } from '../ContactUs/contact-us-page-cms/contact-us-cms-repository';
import { OurProcessPageCms } from '../OurProcess/our-process-page-cms/schema/our-process-page-cms.schema';
import { OurProcessPageCmsRepository } from '../OurProcess/our-process-page-cms/our-process-page-cms-repository';
import { OurProcessServiceOne } from '../OurProcess/our-process-service-one/schema/our-process-service-one.schema';
import { OurProcessServiceOneRepository } from '../OurProcess/our-process-service-one/our-process-service-one.repository';
import { OurProcessServiceTwo } from '../OurProcess/our-process-service-two/schema/our-process-service-two.schema';
import { OurProcessServiceTwoRepository } from '../OurProcess/our-process-service-two/our-process-service-two.repository';
import { OurProcessVideoCms } from '../OurProcess/our-process-video-cms/schema/our-process-video-cms.schema';
import { OurProcessVideoCmsRepository } from '../OurProcess/our-process-video-cms/our-process-video-cms-repository';
import { HeroSectionCms } from '../Home/hero-section-cms/schema/hero-section-cms.schema';
import { HeroSectionCmsRepository } from '../Home/hero-section-cms/hero-section-cms-repository';
import { HomeAboutCms } from '../Home/home-about-cms/schema/home-about-cms.schema';
import { HomeAboutCmsRepository } from '../Home/home-about-cms/home-about-cms-repository';
import { HomeEchoCms } from '../Home/home-echo-cms/schema/home-echo-cms.schema';
import { HomeEchoCmsRepository } from '../Home/home-echo-cms/home-echo-cms-repository';
import { HomeGallery } from '../Home/home-gallery/schema/home-gallery.schema';
import { HomeGalleryRepository } from '../Home/home-gallery/home-gallery.repository';
import { HomeInstagram } from '../Home/home-instagrams/schema/home-instagram.schema';
import { HomeInstagramRepository } from '../Home/home-instagrams/home-instagram.repository';
import { HomeIntro } from '../Home/home-intro/schema/home-intro.schema';
import { HomeIntroRepository } from '../Home/home-intro/home-intro.repository';
import { HomePageCms } from '../Home/home-page-cms/schema/home-page-cms.schema';
import { HomePageCmsRepository } from '../Home/home-page-cms/home-page-cms-repository';
import { HomeProgressWraps } from '../Home/home-progress-wraps/schema/home-progress-wraps.schema';
import { HomeProgressWrapsRepository } from '../Home/home-progress-wraps/home-progress-wraps.repository';
import { HomeSubscribeCms } from '../Home/home-subscribe-cms/schema/home-subscribe-cms.schema';
import { HomeSubscribeCmsRepository } from '../Home/home-subscribe-cms/home-subscribe-cms-repository';
import { HomeTestimonials } from '../Home/home-testimonials/schema/home-testimonials.schema';
import { HomeTestimonialsRepository } from '../Home/home-testimonials/home-testimonials.repository';
import { HomeVideo } from '../Home/home-video/schema/home-video.schema';
import { HomeVideoRepository } from '../Home/home-video/home-video.repository';
import { Product } from '../Product/product/schema/product.schema';
import { ProductRepository } from '../Product/product/product.repository';
import { ProductFaq } from '../Product/product-faq/schema/product-faq.schema';
import { ProductFaqRepository } from '../Product/product-faq/product-faq.repository';
import { ProductCategoryFaq } from '../Product/product-category-faq/schema/product-category-faq.schema';
import { ProductCategoryFaqRepository } from '../Product/product-category-faq/product-category-faq.repository';
import { ProductReview } from '../Product/product-review/schema/product-review.schema';
import { ProductReviewRepository } from '../Product/product-review/product-review.repository';
import { OfferProduct } from '../Product/offer-product/schema/offer-product.schema';
import { OfferProductRepository } from '../Product/offer-product/offer-product.repository';
import { Blog } from '../Blog/blog/schema/blog.schema';
import { BlogRepository } from '../Blog/blog/blog.repository';
import { ProductTag } from '../Product/product-tag/schema/product-tag.schema';
import { ProductComponentUiCms } from '../HomeComponentUI/product-component-ui-cms/schema/product-component-ui-cms.schema';
import { ProductComponentUiCmsRepository } from '../HomeComponentUI/product-component-ui-cms/product-component-ui-cms-repository';
import { ProductDetailsComponentUiCms } from '../HomeComponentUI/product-details-component-ui-cms/schema/product-details-component-ui-cms.schema';
import { ProductDetailsComponentUiCmsRepository } from '../HomeComponentUI/product-details-component-ui-cms/product-details-component-ui-cms-repository';
import { ProductPageCms } from '../Product/product-page-cms/schema/product-page-cms.schema';
import { ProductPageCmsRepository } from '../Product/product-page-cms/product-page-cms-repository';
import { ContactPageComponentUiCms } from '../HomeComponentUI/contact-page-component-ui-cms/schema/contact-page-component-ui-cms.schema';
import { ContactPageComponentUiCmsRepository } from '../HomeComponentUI/contact-page-component-ui-cms/contact-page-component-ui-cms-repository';
import { HomePageUiCms } from '../HomeComponentUI/home-page-ui-cms/schema/home-page-ui-cms.schema';
import { HomePageUiCmsRepository } from '../HomeComponentUI/home-page-ui-cms/home-page-ui-cms-repository';
import { SalesTaxCms } from '../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema';
import { SalesTaxCmsRepository } from '../CMS/SiteSetting/sales-tax/sales-tax-cms-repository';
import { NewsletterPopupCms } from '../PopupModal/newsletter-popup-cms/schema/newsletter-popup-cms.schema';
import { PopupModalPage } from '../PopupModal/promotional-popup-cms/schema/popup-modal-page.schema';
import { PromotionalPopupCms } from '../PopupModal/promotional-popup-cms/schema/promotional-popup-cms.schema';
import { PromotionalPopupCmsRepository } from '../PopupModal/promotional-popup-cms/promotional-popup-cms.repository';
import { PopupModalPageRepository } from '../PopupModal/promotional-popup-cms/promotional-popup-page.repository';
import { NewsletterPopupCmsRepository } from '../PopupModal/newsletter-popup-cms/newsletter-popup-cms.repository';
import { TermsConditionsCms } from '../CMS/SiteSetting/terms-conditions-cms/schema/terms-conditions-cms.schema';
import { TermsConditionsCmsRepository } from '../CMS/SiteSetting/terms-conditions-cms/terms-conditions-cms-repository';
import { TermsConditionPageCms } from '../CMS/SEO/terms-condition-page-cms/schema/terms-condition-page-cms.schema';
import { TermsConditionPageCmsRepository } from '../CMS/SEO/terms-condition-page-cms/terms-conditions-page-cms-repository';
import { PrivacyPolicyCms } from '../CMS/SiteSetting/privacy-policy-cms/schema/privacy-policy-cms.schema';
import { PrivacyPolicyCmsRepository } from '../CMS/SiteSetting/privacy-policy-cms/privacy-policy-cms-repository';
import { PrivacyPolicyPageCms } from '../CMS/SEO/privacy-policy-page-cms/schema/privacy-policy-page-cms.schema';
import { PrivacyPolicyPageCmsRepository } from '../CMS/SEO/privacy-policy-page-cms/privacy-policy-page-cms-repository';
import { ReturnsCms } from '../CMS/SiteSetting/returns-cms/schema/returns-cms.schema';
import { ReturnsCmsRepository } from '../CMS/SiteSetting/returns-cms/returns-cms-repository';
import { ReturnPageCms } from '../CMS/SEO/return-page-cms/schema/return-page-cms.schema';
import { ReturnPageCmsRepository } from '../CMS/SEO/return-page-cms/return-page-cms-repository';
import { ShippingCms } from '../CMS/SiteSetting/shipping-cms/schema/shipping-cms.schema';
import { ShippingCmsRepository } from '../CMS/SiteSetting/shipping-cms/shipping-cms-repository';
import { ShippingPageCms } from '../CMS/SEO/shipping-page-cms/schema/shipping-page-cms.schema';
import { ShippingPageCmsRepository } from '../CMS/SEO/shipping-page-cms/shipping-page-cms-repository';
import { FaqMetaCms } from '../CMS/SEO/faq-meta-cms/schema/faq-meta-cms.schema';
import { FaqMetaCmsRepository } from '../CMS/SEO/faq-meta-cms/faq-meta-cms-repository';
import { Faq } from '../Faq/faq/schema/faq.schema';
import { FaqRepository } from '../Faq/faq/faq.repository';
import { FaqPageCms } from '../Faq/faq-page-cms/schema/faq-page-cms.schema';
import { FaqPageCmsRepository } from '../Faq/faq-page-cms/faq-page-cms-repository';
import { BlogPageCms } from '../Blog/blog-page-cms/schema/blog-page-cms.schema';
import { BlogPageComponentUiCms } from '../HomeComponentUI/blog-page-component-ui-cms/schema/blog-page-component-ui-cms.schema';
import { BlogPageComponentUiCmsRepository } from '../HomeComponentUI/blog-page-component-ui-cms/blog-page-component-ui-cms-repository';
import { BlogPageCmsRepository } from '../Blog/blog-page-cms/blog-page-cms-repository';
import { FilterDto } from 'src/core/filter.dto';
import { ProductMetaCms } from '../CMS/SEO/product-meta-cms/schema/product-meta-cms.schema';
import { ProductMetaCmsRepository } from '../CMS/SEO/product-meta-cms/product-meta-cms-repository';
import { ProductCategoryMetaCms } from '../CMS/SEO/product-category-meta-cms/schema/product-category-meta-cms.schema';
import { ProductCategoryMetaCmsRepository } from '../CMS/SEO/product-category-meta-cms/product-category-meta-cms-repository';
import { BlogMetaCms } from '../CMS/SEO/blog-meta-cms/schema/blog-meta-cms.schema';
import { BlogMetaCmsRepository } from '../CMS/SEO/blog-meta-cms/blog-meta-cms-repository';
import { Coupon } from '../Coupon/schema/coupon.schema';
import { CouponRepository } from '../Coupon/coupon.repository';
import { getCurrentDate } from 'src/utils/dates.utils';
import { SlugDetails } from '../Product/product-category/schema/slug-details.schema';
import { SlugDetailsRepository } from '../Product/product-category/slug-details.repository';
import { Constants } from 'src/utils/constants';
import { OurProcessComponentUiCms } from '../HomeComponentUI/our-process-component-ui-cms/schema/our-process-component-ui-cms.schema';
import { OurProcessComponentUiCmsRepository } from '../HomeComponentUI/our-process-component-ui-cms/our-process-component-ui-cms-repository';
import { AboutComponentUiCms } from '../HomeComponentUI/about-component-ui-cms/schema/about-component-ui-cms.schema';
import { AboutComponentUiCmsRepository } from '../HomeComponentUI/about-component-ui-cms/about-component-ui-cms-repository';
import { CartCms } from '../CMS/SiteSetting/cart-cms/schema/cart-cms.schema';
import { CartCmsRepository } from '../CMS/SiteSetting/cart-cms/cart-cms-repository';
import { CartPageComponentUiCms } from '../HomeComponentUI/cart-page-component-ui-cms/schema/cart-page-component-ui-cms.schema';
import { CartPageComponentUiCmsRepository } from '../HomeComponentUI/cart-page-component-ui-cms/cart-page-component-ui-cms-repository';
@Injectable()
export class SiteFrontendService {
  constructor(
    @InjectModel('site_settings_cms')
    private readonly siteSettingsCmsModel: Model<SiteSettingsCms>,
    @InjectModel('product_categories')
    private readonly productCategoryModel: Model<ProductCategory>,
    @InjectModel('about_us_cms')
    private readonly aboutUsCmsModel: Model<AboutUsCms>,
    @InjectModel('about_us_offer')
    private readonly aboutUsOfferModel: Model<AboutUsOffer>,
    @InjectModel('about_us_page_cms')
    private readonly aboutUsPageCmsModel: Model<AboutUsPageCms>,
    @InjectModel('about_why_choose_us_cms')
    private readonly whyChooseUsCmsModel: Model<WhyChooseUsCms>,
    @InjectModel('about_why_choose_us_features')
    private readonly whyChooseUsFeaturesModel: Model<WhyChooseUsFeatures>,
    @InjectModel('contact_us')
    private readonly contactUsModel: Model<ContactUs>,
    @InjectModel('contact_us_cms')
    private readonly contactUsCmsModel: Model<ContactUsCms>,
    @InjectModel('our_process_page_cms')
    private readonly ourProcessPageCmsModel: Model<OurProcessPageCms>,
    @InjectModel('our_process_service_one')
    private readonly OurProcessServiceOneModel: Model<OurProcessServiceOne>,
    @InjectModel('our_process_service_two')
    private readonly OurProcessServiceTwoModel: Model<OurProcessServiceTwo>,
    @InjectModel('our_process_video_cms')
    private readonly ourProcessVideoCmsModel: Model<OurProcessVideoCms>,
    @InjectModel('hero_section_cms')
    private readonly heroSectionCmsModel: Model<HeroSectionCms>,
    @InjectModel('home_about_cms')
    private readonly homeAboutCmsModel: Model<HomeAboutCms>,
    @InjectModel('home_echo_cms')
    private readonly homeEchoCmsModel: Model<HomeEchoCms>,
    @InjectModel('home_gallery')
    private readonly homeGalleryModel: Model<HomeGallery>,
    @InjectModel('home_instagram')
    private readonly homeInstagramModel: Model<HomeInstagram>,
    @InjectModel('home_intro')
    private readonly homeIntroModel: Model<HomeIntro>,
    @InjectModel('home_page_cms')
    private readonly homePageCmsModel: Model<HomePageCms>,
    @InjectModel('home_progress_wraps')
    private readonly homeProgressWrapsModel: Model<HomeProgressWraps>,
    @InjectModel('home_subscribe_cms')
    private readonly homeSubscribeCmsModel: Model<HomeSubscribeCms>,
    @InjectModel('home_testimonials')
    private readonly homeTestimonialsModel: Model<HomeTestimonials>,
    @InjectModel('home_video')
    private readonly homeVideoModel: Model<HomeVideo>,
    @InjectModel('offer_product')
    private readonly offerProductModel: Model<OfferProduct>,
    @InjectModel('blogs') private readonly blogModel: Model<Blog>,

    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('product_faq')
    private readonly productFaqModel: Model<ProductFaq>,
    @InjectModel('product_category_faq')
    private readonly productCategoryFaqModel: Model<ProductCategoryFaq>,
    @InjectModel('product_review')
    private readonly productReviewModel: Model<ProductReview>,
    @InjectModel('product_tag')
    private readonly productTagModel: Model<ProductTag>,
    @InjectModel('product_component_ui_cms')
    private readonly productComponentUiCmsModel: Model<ProductComponentUiCms>,
    @InjectModel('product_details_component_ui_cms')
    private readonly productDetailsComponentUiCmsModel: Model<ProductDetailsComponentUiCms>,
    @InjectModel('product_page_cms')
    private readonly productPageCmsModel: Model<ProductPageCms>,
    @InjectModel('contact_page_component_ui_cms')
    private readonly contactPageComponentUiCmsModel: Model<ContactPageComponentUiCms>,
    @InjectModel('home_page_ui_cms')
    private readonly homePageUiCmsModel: Model<HomePageUiCms>,
    @InjectModel('sales_taxes')
        private readonly salesTaxCmsModel: Model<SalesTaxCms>,
    @InjectModel('newsletter_popup_cms')
    private readonly newsletterPopupCmsModel: Model<NewsletterPopupCms>,
    @InjectModel('promotional_popup_cms')
        private readonly promotionalPopupCmsModel: Model<PromotionalPopupCms>,
    @InjectModel('terms_conditions_cms')
        private readonly termsConditionsCmsModel: Model<TermsConditionsCms>,
    @InjectModel('seo_terms_condition_page_cms')
        private readonly termsConditionPageCmsModel: Model<TermsConditionPageCms>,
    @InjectModel('privacy_policy_cms')
        private readonly privacyPolicyCmsModel: Model<PrivacyPolicyCms>,
    @InjectModel('seo_privacy_policy_page_cms')
        private readonly privacyPolicyPageCmsModel: Model<PrivacyPolicyPageCms>,
    @InjectModel('returns_cms')
        private readonly returnsCmsModel: Model<ReturnsCms>,
    @InjectModel('seo_return_page_cms')
      private readonly returnPageCmsModel: Model<ReturnPageCms>,
    @InjectModel('shipping_cms')
        private readonly shippingCmsModel: Model<ShippingCms>,
    @InjectModel('seo_shipping_page_cms')
    private readonly shippingPageCmsModel: Model<ShippingPageCms>,
    @InjectModel('seo_faq_meta_cms')
    private readonly faqMetaCmsModel: Model<FaqMetaCms>,
    @InjectModel('faqs') private readonly faqModel: Model<Faq>,
    @InjectModel('faq_page_cms')
    private readonly faqPageCmsModel: Model<FaqPageCms>,
    @InjectModel('blog_page_cms')
    private readonly blogPageCmsModel: Model<BlogPageCms>,
    @InjectModel('blog_page_component_ui_cms')
    private readonly blogPageComponentUiCmsModel: Model<BlogPageComponentUiCms>,
    @InjectModel('product_meta_cms')
    private readonly productMetaCmsModel: Model<ProductMetaCms>,
    @InjectModel('product_category_meta_cms')
    private readonly productCategoryMetaCmsModel: Model<ProductCategoryMetaCms>,
    @InjectModel('blog_meta_cms')
    private readonly blogMetaCmsModel: Model<BlogMetaCms>,
    @InjectModel('coupons') private readonly couponModel: Model<Coupon>,
    @InjectModel('slug_details') private readonly slugDetailsModel: Model<SlugDetails>,
    @InjectModel('our_process_component_ui_cms')
    private readonly ourProcessComponentUiCmsModel: Model<OurProcessComponentUiCms>,
    @InjectModel('about_component_ui_cms')
    private readonly aboutComponentUiCmsModel: Model<AboutComponentUiCms>,
    @InjectModel('cart_cms')
    private readonly cartCmsModel: Model<CartCms>,
    @InjectModel('cart_page_component_ui_cms')
    private readonly cartPageComponentUiCmsModel: Model<CartPageComponentUiCms>
  ) {}
  
  private readonly cartPageComponentUiCmsRepository = new CartPageComponentUiCmsRepository(
    this.cartPageComponentUiCmsModel
  );
  private readonly cartCmsRepository = new CartCmsRepository(
    this.cartCmsModel
  );
  private readonly ourProcessComponentUiCmsRepository = new OurProcessComponentUiCmsRepository(
    this.ourProcessComponentUiCmsModel
  );
  private readonly aboutComponentUiCmsRepository = new AboutComponentUiCmsRepository(
    this.aboutComponentUiCmsModel
  );

  // slug details
  private readonly slugDetailsRepository = new SlugDetailsRepository(this.slugDetailsModel);
  // coupon
  private readonly couponRepository = new CouponRepository(this.couponModel);
  // meta
  private readonly productMetaCmsRepository = new ProductMetaCmsRepository(
    this.productMetaCmsModel
  );
  private readonly productCategoryMetaCmsRepository = new ProductCategoryMetaCmsRepository(
    this.productCategoryMetaCmsModel
  );
  private readonly blogMetaCmsRepository = new BlogMetaCmsRepository(
    this.blogMetaCmsModel
  );
  // blog
  private readonly blogPageCmsRepository = new BlogPageCmsRepository(
    this.blogPageCmsModel
  );
  private readonly blogPageComponentUiCmsRepository = new BlogPageComponentUiCmsRepository(
    this.blogPageComponentUiCmsModel
  );


  //faq 
  private readonly faqMetaCmsRepository = new FaqMetaCmsRepository(
    this.faqMetaCmsModel
  );
  private readonly faqRepository = new FaqRepository(this.faqModel);
  private readonly faqPageCmsRepository = new FaqPageCmsRepository(
    this.faqPageCmsModel
  );
  // shipping
  private readonly shippingCmsRepository = new ShippingCmsRepository(
    this.shippingCmsModel
  );
  private readonly shippingPageCmsRepository = new ShippingPageCmsRepository(
    this.shippingPageCmsModel
  );

  // Return 
  private readonly returnsCmsRepository = new ReturnsCmsRepository(
    this.returnsCmsModel
  );
  private readonly returnPageCmsRepository = new ReturnPageCmsRepository(
    this.returnPageCmsModel
  );
  // privacy
  private readonly privacyPolicyCmsRepository = new PrivacyPolicyCmsRepository(
    this.privacyPolicyCmsModel
  );
  private readonly privacyPolicyPageCmsRepository = new PrivacyPolicyPageCmsRepository(
    this.privacyPolicyPageCmsModel
  );
  // terms and conditions
  private readonly termsConditionsCmsRepository = new TermsConditionsCmsRepository(
    this.termsConditionsCmsModel
  );
  private readonly termsConditionPageCmsRepository = new TermsConditionPageCmsRepository(
    this.termsConditionPageCmsModel
  );


  // product category
  private readonly productRepository = new ProductRepository(this.productModel);
  private readonly productFaqRepository = new ProductFaqRepository(
    this.productFaqModel,
  );
  private readonly productCategoryFaqRepository =
    new ProductCategoryFaqRepository(this.productCategoryFaqModel);
  private readonly productReviewRepository = new ProductReviewRepository(
    this.productReviewModel,
  );
  private readonly productTagRepository = new ProductTagRepository(
    this.productTagModel,
  );
  private readonly productComponentUiCmsRepository =
    new ProductComponentUiCmsRepository(this.productComponentUiCmsModel);
  private readonly productDetailsComponentUiCmsRepository =
    new ProductDetailsComponentUiCmsRepository(
      this.productDetailsComponentUiCmsModel,
    );

  private readonly productPageCmsRepository = new ProductPageCmsRepository(
    this.productPageCmsModel,
  );

  // home page start
  private readonly offerProductRepository = new OfferProductRepository(
    this.offerProductModel,
  );
  private readonly blogRepository = new BlogRepository(this.blogModel);
  private readonly heroSectionCmsRepository = new HeroSectionCmsRepository(
    this.heroSectionCmsModel,
  );
  private readonly homeAboutCmsRepository = new HomeAboutCmsRepository(
    this.homeAboutCmsModel,
  );
  private readonly homeEchoCmsRepository = new HomeEchoCmsRepository(
    this.homeEchoCmsModel,
  );
  private readonly homeGalleryRepository = new HomeGalleryRepository(
    this.homeGalleryModel,
  );

  private readonly homeInstagramRepository = new HomeInstagramRepository(
    this.homeInstagramModel,
  );
  private readonly homeIntroRepository = new HomeIntroRepository(
    this.homeIntroModel,
  );
  private readonly homePageCmsRepository = new HomePageCmsRepository(
    this.homePageCmsModel,
  );
  private readonly homeProgressWrapsRepository =
    new HomeProgressWrapsRepository(this.homeProgressWrapsModel);
  private readonly homeSubscribeCmsRepository = new HomeSubscribeCmsRepository(
    this.homeSubscribeCmsModel,
  );

  private readonly homeTestimonialsRepository = new HomeTestimonialsRepository(
    this.homeTestimonialsModel,
  );

  private readonly homeVideoRepository = new HomeVideoRepository(
    this.homeVideoModel,
  );
  private readonly homePageUiCmsRepository = new HomePageUiCmsRepository(
    this.homePageUiCmsModel
);

  // home page end

  private readonly productCategoryRepository = new ProductCategoryRepository(
    this.productCategoryModel,
  );
  private readonly siteSettingsCmsRepository = new SiteSettingsCmsRepository(
    this.siteSettingsCmsModel,
  );
  // about us page
  private readonly aboutUsCmsRepository = new AboutUsCmsRepository(
    this.aboutUsCmsModel,
  );
  private readonly aboutUsOfferRepository = new AboutUsOfferRepository(
    this.aboutUsOfferModel,
  );

  private readonly aboutUsPageCmsRepository = new AboutUsPageCmsRepository(
    this.aboutUsPageCmsModel,
  );
  private readonly whyChooseUsCmsRepository = new WhyChooseUsCmsRepository(
    this.whyChooseUsCmsModel,
  );

  private readonly whyChooseUsFeaturesRepository =
    new WhyChooseUsFeaturesRepository(this.whyChooseUsFeaturesModel);
  // contact us
  private readonly contactUsRepository = new ContactUsRepository(
    this.contactUsModel,
  );
  private readonly contactUsCmsRepository = new ContactUsCmsRepository(
    this.contactUsCmsModel,
  );
  private readonly contactPageComponentUiCmsRepository = new ContactPageComponentUiCmsRepository(
    this.contactPageComponentUiCmsModel
);

  // our process
  private readonly ourProcessPageCmsRepository =
    new OurProcessPageCmsRepository(this.ourProcessPageCmsModel);
  private readonly ourProcessServiceOneRepository =
    new OurProcessServiceOneRepository(this.OurProcessServiceOneModel);
  private readonly ourProcessServiceTwoRepository =
    new OurProcessServiceTwoRepository(this.OurProcessServiceTwoModel);
  private readonly ourProcessVideoCmsRepository =
    new OurProcessVideoCmsRepository(this.ourProcessVideoCmsModel);

    // sales tax
    private readonly salesTaxCmsRepository = new SalesTaxCmsRepository(
      this.salesTaxCmsModel
  );
  // popup modal

  private readonly promotionalPopupCmsRepository = new PromotionalPopupCmsRepository(
    this.promotionalPopupCmsModel
);

private readonly newsletterPopupCmsRepository = new NewsletterPopupCmsRepository(
  this.newsletterPopupCmsModel
);


  async getCommonCMSData(): Promise<any | Error> {
    const [
      siteSettingData,
      allCategoryData,
      parentCategoryData,
      homeSubscribeCms,
    ] = await Promise.all([
      this.siteSettingsCmsRepository.findOneEntity(),
      this.productCategoryRepository.findAll(),
      this.productCategoryRepository.findAllParentCategory(),
      this.homeSubscribeCmsRepository.findOneEntity()
    ]);
  
    const categoryDataPromises = parentCategoryData.map(async (category) => {
      const subMenu = await this.productCategoryRepository.findAllByFilterQuery({
        categoryId: category._id,
      });
      return subMenu.length > 0 ? { ...category, subMenu } : category;
    });
  
    const categoryData = await Promise.all(categoryDataPromises);
  
    const data = {
      categoryData,
      allCategoryData,
      siteSettingData,
      homeSubscribeCms
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }


  async getHomePageData(): Promise<any | Error> {
    const [
      heroSectionCms,
      homeAboutCms,
      homeEchoCms,
      homeGallery,
      homeInstagram,
      homeIntro,
      homePageCms,
      homeProgressWraps,
      homeTestimonials,
      homeVideo,
      product,
      home_components,
      offerProductData,
      blog,
    ] = await Promise.all([
      this.heroSectionCmsRepository.findOneEntity(),
      this.homeAboutCmsRepository.findOneEntity(),
      this.homeEchoCmsRepository.findOneEntity(),
      this.homeGalleryRepository.findAll(),
      this.homeInstagramRepository.findAll(),
      this.homeIntroRepository.findAll(),
      this.homePageCmsRepository.findOneEntity(),
      this.homeProgressWrapsRepository.findAll(),
      this.homeTestimonialsRepository.findAll(),
      this.homeVideoRepository.findAll(),
      this.productRepository.findHomePageProduct(),
      this.homePageUiCmsRepository.findOneEntity(),
      this.offerProductRepository.findHomePageOfferProduct(),
      this.blogRepository.findHomePageBlog(),
    ]);

    const offerProductDataPromise = offerProductData.map(async (offerProd) => {
      const productData = await this.productRepository.findOnePopulateEntity(offerProd?.productId);
      offerProd.product=productData;
      return offerProd;
    });
  
    const offerProduct = await Promise.all(offerProductDataPromise);

    const data = {
      heroSectionCms,
      homeAboutCms,
      homeEchoCms,
      homeGallery,
      homeInstagram,
      homeIntro,
      homePageCms,
      homeProgressWraps,
      homeTestimonials,
      homeVideo,
      product,
      offerProduct,
      blog,
      home_components,
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getAboutUsPageData(): Promise<any | Error> {
      const [
        aboutUsCmsData,
        aboutUsOffer,
        aboutUsPageCmsData,
        whyChooseUsCmsData,
        whyChooseUsFeaturesData,
        componentUI
      ] = await Promise.all([
        this.aboutUsCmsRepository.findOneEntity(),
        this.aboutUsOfferRepository.findAll(),
        this.aboutUsPageCmsRepository.findOneEntity(),
        this.whyChooseUsCmsRepository.findOneEntity(),
        this.whyChooseUsFeaturesRepository.findAll(),
        this.aboutComponentUiCmsRepository.findOneEntity()
      ]);

    const data = {
      aboutUsCmsData,
      aboutUsOffer,
      aboutUsPageCmsData,
      whyChooseUsCmsData,
      whyChooseUsFeaturesData,
      componentUI
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getContactUsPageData(): Promise<any | Error> {
    const [
      contactUsCms,
      contact_components,
      site
    ] = await Promise.all([
      this.contactUsCmsRepository.findOneEntity(),
      this.contactPageComponentUiCmsRepository.findOneEntity(),
      this.siteSettingsCmsRepository.findOneEntity(),
    ]);

    const data = {
      contactUsCms,
      contact_components,
      site,
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getOurProcessPageData(): Promise<any | Error> {
    const [
      ourProcessPageCms,
      ourProcessServiceOne,
      ourProcessServiceTwo,
      ourProcessVideoCms,
      componentUI
    ] = await Promise.all([
      this.ourProcessPageCmsRepository.findOneEntity(),
      this.ourProcessServiceOneRepository.findAll(),
      this.ourProcessServiceTwoRepository.findAll(),
      this.ourProcessVideoCmsRepository.findOneEntity(),
      this.ourProcessComponentUiCmsRepository.findOneEntity(),
    ]);

    const data = {
      ourProcessPageCms,
      ourProcessServiceOne,
      ourProcessServiceTwo,
      ourProcessVideoCms,
      componentUI
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }
  async getCartPageData(): Promise<any | Error> {
    const [
      cartPageCms,
      componentUI
    ] = await Promise.all([
      this.cartCmsRepository.findOneEntity(),
      this.cartPageComponentUiCmsRepository.findOneEntity(),
    ]);

    const data = {
      cartPageCms,
      componentUI
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }
  async getMetaData(): Promise<any | Error> {
    const [
      seoTermsConditionData,
      seoPrivacyPolicyData,
      seoReturnData,
      seoShippingData,
      seoFaqMetaData      
    ] = await Promise.all([
      this.termsConditionPageCmsRepository.findOneEntity(),
      this.privacyPolicyPageCmsRepository.findOneEntity(),
      this.returnPageCmsRepository.findOneEntity(),
      this.shippingPageCmsRepository.findOneEntity(),
      this.faqMetaCmsRepository.findOneEntity(),    
    ]); 
    const data = {
      seoTermsConditionData,
      seoPrivacyPolicyData,
      seoReturnData,
      seoShippingData,
      seoFaqMetaData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }
  async getObdShopPageData(slug: string): Promise<any | Error> {
    let data: any = {};
    let slugComponentName = 'none';
    let productDetails:Product = null;
    let productCategoryPageCms:ProductCategory=null;
    let categoryId=''; let productId='';
    const checkProductCategorySlug = await this.productCategoryRepository.findOneEntityBySlug(slug);
    if(checkProductCategorySlug){
      productCategoryPageCms=checkProductCategorySlug;
      slugComponentName = 'category';
      categoryId=checkProductCategorySlug._id.toString();
    }else{
      const checkProductSlug = await this.productRepository.findOneEntityBySlug(slug);
      if(checkProductSlug){
        productDetails=checkProductSlug;
        slugComponentName = 'product';
        productId = checkProductSlug?._id.toString();
      }else{
        const checkSlugDetails = await this.slugDetailsRepository.findOneEntityBySlug(slug);
        if(checkSlugDetails){
            if(checkSlugDetails.type==='category'){
              categoryId=checkSlugDetails?.slug_id.toString();
              slugComponentName = 'category';
              const categoryInfo = await this.productCategoryRepository.findOneEntity(categoryId);
              if(!categoryInfo){
                throw new NotFoundException(
                  Constants.NOT_FOUND,
                );
              }
              productCategoryPageCms=categoryInfo;
            }else if(checkSlugDetails.type==='product'){
              productId=checkSlugDetails?.slug_id.toString();
              const productInfo = await this.productRepository.findOneEntity(productId);
              if(!productInfo){
                throw new NotFoundException(
                  Constants.NOT_FOUND,
                );
              }
              productDetails=productInfo;
              slugComponentName = 'product';
            }
        }
      }
    }
    if(slugComponentName==='none'){
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }else if(slugComponentName==='category'){
      const [products, productCategoryFaq, product_components, seo] = await Promise.all([
        this.productRepository.findAllProductByCategory(categoryId),
        this.productCategoryFaqRepository.findOneByFilterQuery({ categoryId }),
        this.productComponentUiCmsRepository.findOneEntity(),
        this.productCategoryMetaCmsRepository.findOneByFilterQuery({categoryId:categoryId})
      ]);

      data = {
        slugComponentName,
        products,
        productCategoryPageCms,
        productCategoryFaq,
        product_components,
        seo
      };

    }else{
      const [component, productReview, productFaq, relatedProduct, seo] = await Promise.all([
        this.productDetailsComponentUiCmsRepository.findOneEntity(),
        this.productReviewRepository.findAllReviewByProduct(productId),
        this.productFaqRepository.findOneByFilterQuery({ productId }),
        this.productRepository.findAllRelatedProduct(productId, productDetails?.categoryIds),
        this.productMetaCmsRepository.findOneByFilterQuery({productId:productId})
      ]);

      const reviewRating = productReview?.length;

      data = {
        slugComponentName,
        productDetails,
        component,
        productReview,
        reviewRating,
        productFaq,
        relatedProduct,
        seo
      };
    }
    
    return ResponseUtils.successResponseHandler(200, 'Data fetched successfully', 'data', data);
  }

  async getObdShopPageMetaData(slug: string): Promise<any | Error> {
    let data: any = {};
    let slugComponentName = 'none';
    let productDetails:Product = null;
    let productCategoryPageCms:ProductCategory=null;
    let categoryId=''; let productId='';
    const checkProductCategorySlug = await this.productCategoryRepository.findOneEntityBySlug(slug);
    if(checkProductCategorySlug){
      productCategoryPageCms=checkProductCategorySlug;
      slugComponentName = 'category';
      categoryId=checkProductCategorySlug._id.toString();
    }else{
      const checkProductSlug = await this.productRepository.findOneEntityBySlug(slug);
      if(checkProductSlug){
        productDetails=checkProductSlug;
        slugComponentName = 'product';
        productId = checkProductSlug?._id.toString();
      }else{
        const checkSlugDetails = await this.slugDetailsRepository.findOneEntityBySlug(slug);
        if(checkSlugDetails){
            if(checkSlugDetails.type==='category'){
              categoryId=checkSlugDetails?.slug_id.toString();
              slugComponentName = 'category';
              const categoryInfo = await this.productCategoryRepository.findOneEntity(categoryId);
              if(!categoryInfo){
                throw new NotFoundException(
                  Constants.NOT_FOUND,
                );
              }
              productCategoryPageCms=categoryInfo;
            }else if(checkSlugDetails.type==='product'){
              productId=checkSlugDetails?.slug_id.toString();
              const productInfo = await this.productRepository.findOneEntity(productId);
              if(!productInfo){
                throw new NotFoundException(
                  Constants.NOT_FOUND,
                );
              }
              productDetails=productInfo;
              slugComponentName = 'product';
            }
        }
      }
    }
    if(slugComponentName==='category'){
      const seoMetaData = await this.productCategoryMetaCmsRepository.findOneByFilterQuery({categoryId:categoryId})
      data = {
        slugComponentName,
        seoMetaData,
        slug
      };
    }else if(slugComponentName==='product'){
      const seoMetaData = await this.productMetaCmsRepository.findOneByFilterQuery({productId:productId});  
      data = {
        slugComponentName,
        seoMetaData,
        slug
      };
    }
    
    return ResponseUtils.successResponseHandler(200, 'Data fetched successfully', 'data', data);
  }
  


  async getObdShopData(): Promise<any | Error> {
    const [productPageCms, product, product_components] = await Promise.all([
      this.productPageCmsRepository.findOneEntity(),
      this.productRepository.findAll(),
      this.productComponentUiCmsRepository.findOneEntity(),
    ]);
  
    const data = { productPageCms, product, product_components };
  
    return ResponseUtils.successResponseHandler(200, 'Data fetched successfully', 'data', data);
  }


  async getSalesTaxCMSData(): Promise<any | Error> {
    const salesTaxData = {title:'Sales Tax update',dis_amount:'0'};
    const data = await this.salesTaxCmsRepository.findOneEntity();
    if(data){
      salesTaxData.dis_amount=data.dis_amount;
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      salesTaxData,
    );
  }

  async getPopupModalCMSData(pageType:string): Promise<any | Error> {
    const data = (pageType==='promo') ? await this.promotionalPopupCmsRepository.findOneEntity() : await this.newsletterPopupCmsRepository.findOneEntity();
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getTermsAndConditionCMSData(): Promise<any | Error> {
    const [
      termsConditionData
    ] = await Promise.all([
      this.termsConditionsCmsRepository.findOneEntity()
    ]);
  
    const data = {
      termsConditionData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getPrivacyCMSData(): Promise<any | Error> {
    const [
      privacyPolicyData
    ] = await Promise.all([
      this.privacyPolicyCmsRepository.findOneEntity()
    ]);
  
    const data = {
      privacyPolicyData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getReturnCMSData(): Promise<any | Error> {
    const [
      returnData
    ] = await Promise.all([
      this.returnsCmsRepository.findOneEntity()
    ]);
  
    const data = {
      returnData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getShippingCMSData(): Promise<any | Error> {
    const [
      shippingData
    ] = await Promise.all([
      this.shippingCmsRepository.findOneEntity()
    ]);
  
    const data = {
      shippingData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getFaqData(): Promise<any | Error> {
    const [
      faqData,
      faqPageCmsData,
      siteSetting
    ] = await Promise.all([
      this.faqRepository.findAll(),
      this.faqPageCmsRepository.findOneEntity(),
      this.siteSettingsCmsRepository.findOneEntity(),
    ]);
  
    const data = {
      faqData,
      faqPageCmsData,
      siteSetting
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getBlogData(filterDto:FilterDto): Promise<any | Error> {
    const [
      blogPageCms,
      blogData,
      blog_components
    ] = await Promise.all([
      this.blogPageCmsRepository.findOneEntity(),
      this.blogRepository.paginate(filterDto),
      this.blogPageComponentUiCmsRepository.findOneEntity()
    ]);
  
    const data = {
      blogPageCms,
      blogData,
      blog_components
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getBlogDetailsData(slug:string): Promise<any | Error> {
    let blogData:Blog=null;
    const blogInfo = await this.blogRepository.findOneByFilterQuery({slug:slug});
    if(blogInfo){
      blogData=blogInfo;
    }else{
      const checkSlugDetails = await this.slugDetailsRepository.findOneEntityBySlug(slug);
      if(checkSlugDetails && checkSlugDetails?.type==="blog"){
          const blogDetailInfo = await this.blogRepository.findOneEntity(checkSlugDetails?.slug_id.toString());
          if(!blogDetailInfo){
            throw new NotFoundException(
              "Blog details Not Found"
            );
          }
          blogData=blogDetailInfo;
      }
    }
    if(!blogData){  
      throw new NotFoundException(
        "Blog details Not Found"
      );
    }
    const seo = await this.blogMetaCmsRepository.findOneByFilterQuery({blogId:blogData?._id});
    const data = {
      blogData,
      seo,
      slug
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }


  async getCartSummaryData(): Promise<any | Error> {
    const salesTaxData = {title:'Sales Tax update',dis_amount:'0'};
    const current_date = getCurrentDate();
    const [salesTaxInfo, freeShipping, quantityDiscount, categoryQuantityDiscount] = await Promise.all([
      this.salesTaxCmsRepository.findOneEntity(),
      this.couponRepository.findOneByFilterQuery({couponTypes:'free_shipping', expireDate: { $gte: current_date }, status:'Active'}),
      this.couponRepository.findAllByFilterQuery({couponTypes:'quantity_discount', expireDate: { $gte: current_date }, status:'Active'}),
      this.couponRepository.findAllByFilterQuery({couponTypes:'quantity_discount_category_wise', expireDate: { $gte: current_date }, status:'Active'}),

    ])
    if(salesTaxInfo){
      salesTaxData.dis_amount=salesTaxInfo.dis_amount;
    }
    const data = {salesTaxData,freeShipping,quantityDiscount,categoryQuantityDiscount}
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getPopulateProductData(id: string): Promise<any | Error> {
    const data = await this.productRepository.findOnePopulateEntity(id);
    if (!data) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

}
