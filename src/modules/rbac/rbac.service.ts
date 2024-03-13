import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pages } from './schema/pages.schema';
import { PagesRepository } from './pages.repository';
import { CreatePagesDto } from './dto/create-pages.dto';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UpdatePagesDto } from './dto/update-pages.dto';
import { Role } from './schema/role.schema';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RbacService {
  constructor(
    @InjectModel('app_pages') private readonly pagesModel: Model<Pages>,
    @InjectModel('role') private readonly roleModel: Model<Role>
  ) {}

  private readonly pagesRepository = new PagesRepository(this.pagesModel);
  private readonly roleRepository = new RoleRepository(this.roleModel);

  async createPage(dto: CreatePagesDto): Promise<Pages> {
    const data = await this.pagesRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully added to Pages.',
      'data',
      data,
    );
  }

  async findAllPage(pageParam?: string, limitParam?: string): Promise<Pages[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.pagesRepository.paginate(page, limit);
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

  async findOnePage(id: string): Promise<Pages | null> {
    const data = await this.pagesRepository.findOneEntity(id);
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

  async updatePage(id: string, dto: UpdatePagesDto): Promise<Pages | null> {
    const res = await this.pagesRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.pagesRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async removePage(id: string): Promise<void> {
    const res = await this.pagesRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.pagesRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const checkRole = await this.roleRepository.findOneByFilterQuery({
      roleName: dto.roleName,
    });
    if (checkRole) {
      throw new BadRequestException(`Role already exists!`);
    }
    const data = await this.roleRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully added to Role.',
      'data',
      data,
    );
  }
  async roleFormData(): Promise<Pages[]> {
    const data = await this.pagesRepository.findAll();
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }


  async findAllRole(pageParam?: string, limitParam?: string): Promise<Role[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.roleRepository.paginate(page, limit);
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

  async findOneRole(id: string): Promise<Role | null> {
    const data = await this.roleRepository.findOneEntity(id);
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

  async updateRole(id: string, dto: UpdateRoleDto): Promise<Role | null> {
    const res = await this.roleRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const checkRole = await this.roleRepository.findOneByFilterQuery({
      roleName: dto.roleName,
      _id: { $ne: id }
    });
    if (checkRole) {
      throw new BadRequestException(`Role already exists!`);
    }
    const data = await this.roleRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async removeRole(id: string): Promise<void> {
    const res = await this.roleRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.roleRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
