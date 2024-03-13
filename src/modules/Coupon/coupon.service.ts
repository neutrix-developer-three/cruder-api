import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { CouponRepository } from './coupon.repository';
import { Coupon } from './schema/coupon.schema';
import { ProductCategory } from '../Product/product-category/schema/product-category.schema';
import { ProductCategoryRepository } from '../Product/product-category/product-category.repository';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { generateCouponCode } from 'src/utils/common-helper';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { getCurrentDate } from 'src/utils/dates.utils';
import { LogActivityService } from '../LogActivity/log-activity.service';
import { FilterDto } from 'src/core/filter.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel('coupons') private readonly couponModel: Model<Coupon>,
    @InjectModel('product_categories') private readonly productCategoryModel: Model<ProductCategory>,
    private readonly logService: LogActivityService) { }

  private readonly couponRepository = new CouponRepository(this.couponModel);
  private readonly productCategoryRepository = new ProductCategoryRepository(
    this.productCategoryModel,
  );

  async create(dto: CreateCouponDto,
    ): Promise<Coupon> {

      const checkCode = await this.couponRepository.findOneByFilterQuery({
        couponCode: dto.couponCode,
      });
      if (checkCode) {
        throw new BadRequestException(`Coupon code already exists!`);
      }

      if(dto.category_id){
        const category =
        await this.productCategoryRepository.findOneEntity(dto.category_id);
        if (!category) {
          throw new NotFoundException('Category Not Found');
        }
        dto.category=category;
      }

    const data = await this.couponRepository.createEntity(dto);
    await this.logService.createLog('Coupon Added.');
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(filterDto:FilterDto): Promise<Coupon[]> {
    const data = await this.couponRepository.paginate(filterDto);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }
  
  async formData(): Promise<ProductCategory[]> {
    const category =
        await this.productCategoryRepository.findAll();
    const couponCode = generateCouponCode(10);
    const data ={couponCode,category}
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }


  async findOne(id: string): Promise<Coupon | null> {
    const data = await this.couponRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }
  async checkCoupon(coupon_code: string): Promise<Coupon | null> {
    const current_date = getCurrentDate();
    const data = await this.couponRepository.findOneByFilterQuery({couponCode:coupon_code, expireDate: { $gte: current_date }, status:'Active'});
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateCouponDto): Promise<Coupon | null> {
    const res = await this.couponRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const checkCode = await this.couponRepository.findOneByFilterQuery({
      couponCode: dto.couponCode,
      _id: { $ne: id }
    });
    if (checkCode) {
      throw new BadRequestException(`Coupon code already exists!`);
    }


    if(dto.category_id){
      const category =
      await this.productCategoryRepository.findOneEntity(dto.category_id);
      if (!category) {
        throw new NotFoundException('Category Not Found');
      }
      dto.category=category;
    }else{
      dto.category=null;
    }
    
    const data = await this.couponRepository.updateEntity(id, dto);
    await this.logService.createLog('Coupon Updated.');
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.couponRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.couponRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Coupon deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}