import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { Role } from 'src/modules/rbac/schema/role.schema';
import { RoleRepository } from 'src/modules/rbac/role.repository';
import { FilterDto } from 'src/core/filter.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly doSpaceService: DoSpacesService,
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    @InjectModel('role') private readonly roleModel: Model<Role>,
  ) {}

  private readonly usersRepository = new UsersRepository(this.usersModel);
  private readonly roleRepository = new RoleRepository(this.roleModel);

  async create(
    dto: CreateUsersDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<Users> {
    try {

      const checkUser = await this.usersRepository.findOneByFilterQuery({
          email: dto.email
      });
      if (checkUser) {
          throw new BadRequestException(`User already exists!`);
      }
      dto.fullName=dto?.firstName+' '+dto.lastName;
      if (dto.role_id) {
        const role = await this.roleRepository.findOneEntity(
          dto?.role_id,
        );
        if (!role) {
          throw new NotFoundException('Role Not Found');
        }
        dto.role = role;
      }
      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(
          files.image[0],
          'chillMedicatedUsers/',
        );
        dto.image = image;
      } else
        dto.image =
          'https://neutrix-site.nyc3.digitaloceanspaces.com/default.png';

      const data = await this.usersRepository.createEntity(dto);
      if (!data) {
        throw new BadRequestException(Constants.CREATE_FAILED);
      }
      return ResponseUtils.successResponseHandler(
        201,
        'Successfully created data',
        'data',
        data,
      );
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async formData(): Promise<Role[]> {
    const data = await this.roleRepository.findAll();
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findAll(filterDto:FilterDto): Promise<Users[]> {
    const data = await this.usersRepository.paginate(filterDto);
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

  async findAllCustomer(filterDto:FilterDto): Promise<Users[]> {
    const data = await this.usersRepository.customerPaginate(filterDto);
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

  async findAllAdminUser(): Promise<Users[]> {
    const data = await this.usersRepository.findAllAdminUser();
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findOne(id: string): Promise<Users | null> {
    const data = await this.usersRepository.findOneEntity(id);
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

  async update(
    id: string,
    dto: UpdateUsersDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<Users | null> {
    const res = await this.usersRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const checkUser = await this.usersRepository.findOneByFilterQuery({
      email: dto.email,
      _id: { $ne: id }
    });
    if (checkUser) {
        throw new BadRequestException(`User already exists!`);
    }
    dto.fullName=dto?.firstName+' '+dto.lastName;
    if (dto.role_id) {
      const role = await this.roleRepository.findOneEntity(
        dto?.role_id,
      );
      if (!role) {
        throw new NotFoundException('Role Not Found');
      }
      dto.role = role;
    }else{
      dto.role = null;
    }
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(
        files.image[0],
        'chillMedicatedUsers/',
      );
      dto.image = image;
    } else if (res?.image) dto.image = res?.image;
    else
      dto.image =
        'https://neutrix-site.nyc3.digitaloceanspaces.com/default.png';
    const data = await this.usersRepository.updateEntity(id, dto);
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

  async delete(id: string): Promise<void> {
    const res = await this.usersRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.usersRepository.deleteEntity(id);
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
