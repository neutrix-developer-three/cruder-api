import * as fs from 'fs';
import * as path from 'path';

interface SchemaProperty {
    name: string;
    type: string;
}

export function generateEntity(entityName: string, schemaProperties: SchemaProperty[]): void {
    const properties = schemaProperties.map(prop => `@Prop() ${prop.name}: ${prop.type};`).join('\n');

    const entityTemplate = `
        import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
        import { AbstractDocument } from '../../../../core/abstract-entity';
        
        @Schema({ timestamps: true, id: true, versionKey: false })
        export class ${entityName}CMS extends AbstractDocument {
            ${properties}
        }
        
        export const ${entityName}CMSSchema = SchemaFactory.createForClass(${entityName}CMS);
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        entityName.toLowerCase(),
        "entities"
    );

    try {
        // Create Entity Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${entityName?.toLowerCase()}-cms.entity.ts`);
        fs.writeFileSync(componentFilePath, entityTemplate);
    } catch (error) {
        console.error(`Error generating entity ${entityName}:`, error);
    }
}

export function generateBaseDTO(dtoName: string, schemaProperties: SchemaProperty[]): void {
    const properties = schemaProperties.map(prop => `@IsNotEmpty() ${prop.name}: ${prop.type};`).join('\n');

    const dtoTemplate = `
        import { IsNotEmpty, IsOptional } from "class-validator";

        export class Base${dtoName}CMSDto {
            ${properties}
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        dtoName.toLowerCase(),
        "dto"
    );

    try {
        // Create Entity Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `base-${dtoName?.toLowerCase()}-cms.dto.ts`);
        fs.writeFileSync(componentFilePath, dtoTemplate);
    } catch (error) {
        console.error(`Error generating entity ${dtoName}:`, error);
    }
}

export function generateUpdateDTO(dtoName: string): void {

    const dtoTemplate = `
        import { PartialType } from "@nestjs/mapped-types";
        import { Base${dtoName}CMSDto } from "./base-${dtoName.toLowerCase()}-cms.dto";
        
        export class Update${dtoName}CMSDto extends PartialType(Base${dtoName}CMSDto) {
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        dtoName.toLowerCase(),
        "dto"
    );

    try {
        // Create Entity Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `update-${dtoName?.toLowerCase()}-cms.dto.ts`);
        fs.writeFileSync(componentFilePath, dtoTemplate);
    } catch (error) {
        console.error(`Error generating entity ${dtoName}:`, error);
    }
}

export function generateController(controllerName: string): void {

    const controllerTemplate = `
        import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
        import { FileFieldsInterceptor } from "@nestjs/platform-express";
        import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
        import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
        import { Constants } from "src/utils/constants";
        import { ${controllerName}CMSService } from "./${controllerName.toLowerCase()}-cms.service";
        import { Update${controllerName}CMSDto } from "./dto/update-${controllerName.toLowerCase()}-cms.dto";

        @Controller({ path: "${controllerName.toLowerCase()}-cms", version: Constants.API_VERSION_1 })

        export class ${controllerName}CMSController {
            constructor(private readonly service: ${controllerName}CMSService) {
            }

            @Post()
            @HttpCode(HttpStatus.OK)
            @UseGuards(AdminAuthGuard)
            @UseInterceptors(FileFieldsInterceptor(
                [
                    { name: "image", maxCount: 1 }
                ]
            ))
            updateOrCreateData(
                @Body() dto: Update${controllerName}CMSDto,
                @UploadedFiles() files: {
                    image?: UploadedMulterFileI
                }
            ) {
                return this.service.updateOrCreateData(dto, files);
            }

            @Get()
            // @UseGuards(AdminAuthGuard)
            findAll() {
                return this.service.findAll();
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        controllerName.toLowerCase()
    );

    try {
        // Create Controller Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${controllerName.toLowerCase()}-cms.controller.ts`);
        fs.writeFileSync(componentFilePath, controllerTemplate);
    } catch (error) {
        console.error(`Error generating controller ${controllerName}:`, error);
    }
}

export function generateService(serviceName: string, entityName: string): void {

    const serviceTemplate = `
        import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
        import { InjectModel } from "@nestjs/mongoose";
        import { Model } from "mongoose";
        import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
        import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
        import { Constants } from "src/utils/constants";
        import { ResponseUtils } from "src/utils/response.utils";
        import { ${serviceName}CMSRepository } from "./${serviceName.toLowerCase()}-cms.repository";
        import { Update${serviceName}CMSDto } from './dto/update-${serviceName.toLowerCase()}-cms.dto';
        import { ${serviceName}CMS } from "./schema/${serviceName.toLowerCase()}-cms.schema";
        
        @Injectable()
        export class ${serviceName}CMSService {
            constructor(
                private readonly doSpaceService: DoSpacesService,
                @InjectModel('${serviceName.toLowerCase()}_cms')
                private readonly ${serviceName.toLowerCase()}CMSModel: Model<${serviceName}CMS>
            ) { }
        
            private readonly ${serviceName.toLowerCase()}CMSRepository =
                new ${serviceName}CMSRepository(this.${serviceName.toLowerCase()}CMSModel);
        
            async updateOrCreateData(
                dto: Update${serviceName}CMSDto,
                files: {
                    image?: UploadedMulterFileI
                }
            ): Promise<${serviceName}CMS | Error> {
                if (files && files.image) {
                    const image: any = await this.doSpaceService.uploadFile(files.image[0], "${serviceName}CMS/");
                    dto.image = image;
                }
                const isExists = await this.${serviceName.toLowerCase()}CMSRepository.findOneByFilterQuery({ isDeleted: false });
                if (!isExists) {
                    const data = await this.${serviceName.toLowerCase()}CMSRepository.createEntity(dto);
                    if (!data) {
                        throw new BadRequestException("Failed to create data!");
                    }
                    return ResponseUtils.successResponseHandler(201, "Data created successfully!", "data", data);
                } else {
                    const id = isExists?._id.toString();
                    const data = await this.${serviceName.toLowerCase()}CMSRepository.updateEntity(id, dto);
                    if (!data) {
                        throw new BadRequestException("Failed to update data!");
                    }
                    return ResponseUtils.successResponseHandler(200, "Data updated successfully!", "data", data);
                }
            }
        
            async findAll(): Promise<${serviceName}CMS[] | Error> {
                const data = await this.${serviceName.toLowerCase()}CMSRepository.findAll();
                if (!data) {
                    throw new HttpException(
                        Constants.NOT_FOUND,
                        HttpStatus.NOT_FOUND
                    );
                }
                return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        serviceName.toLowerCase()
    );

    try {
        // Create Service Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${serviceName?.toLowerCase()}-cms.service.ts`);
        fs.writeFileSync(componentFilePath, serviceTemplate);
    } catch (error) {
        console.error(`Error generating service ${serviceName}:`, error);
    }
}

export function generateRepository(repositoryName: string, entityName: string): void {

    const repositoryTemplate = `
        import mongoose, { Model, Types } from 'mongoose';
        import { Update${repositoryName}CMSDto } from './dto/update-${repositoryName.toLowerCase()}-cms.dto';
        import { ${repositoryName}CMS } from './entites/${repositoryName.toLowerCase()}-cms.entity';

        export class ${repositoryName}CMSRepository<${repositoryName}CMSDocument extends ${repositoryName}CMS> {
            constructor(private readonly model: Model<${repositoryName}CMSDocument>) { }

            async createEntity(data: Update${repositoryName}CMSDto): Promise<${repositoryName}CMSDocument> {
                try {
                    const createdEntity = new this.model({
                        ...data,
                        _id: new Types.ObjectId()
                    });
                    return await createdEntity.save();
                } catch (err) {
                    console.log(err);
                }
            }

            async findOneEntity(id: string): Promise<${repositoryName}CMSDocument | null> {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return null;
                }
                return await this.model.findOne({ _id: id, isDeleted: false });
            }

            async updateEntity(id: string, data: Update${repositoryName}CMSDto): Promise<${repositoryName}CMSDocument | null> {
                try {
                    return await this.model.findByIdAndUpdate(id, data, { new: true });
                } catch (err) {
                    console.log(err);
                }
            }

            async deleteEntity(id: string): Promise<boolean> {
                const data = await this.model.findByIdAndUpdate(
                    id,
                    { isDeleted: true },
                    { new: true }
                );
                if (data) return true;
                return false;
            }

            async findAll(): Promise<${repositoryName}CMSDocument[]> {
                return await this.model.find({ isDeleted: false });
            }

            async findOneByFilterQuery(query: any): Promise<${repositoryName}CMSDocument | null> {
                return await this.model.findOne({ ...query, isDeleted: false }).lean();
            }

            async findByFilterQuery(query: any): Promise<${repositoryName}CMSDocument[] | null> {
                return await this.model.find({ ...query, isDeleted: false }).lean();
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        repositoryName.toLowerCase()
    );

    try {
        // Create Repository Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${repositoryName?.toLowerCase()}-cms.repository.ts`);
        fs.writeFileSync(componentFilePath, repositoryTemplate);
    } catch (error) {
        console.error(`Error generating repository ${repositoryName}:`, error);
    }
}

export function generateModule(moduleName: string, serviceName: string, repositoryName: string, entityName: string, controllerName: string): void {

    const moduleTemplate = `
        import { Module } from "@nestjs/common";
        import { JwtModule } from "@nestjs/jwt";
        import { MongooseModule } from "@nestjs/mongoose";
        import JwtConfigService from "src/core/jwt/jwt-config.service";
        import JwtHelper from "src/core/jwt/jwt.helper";
        import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
        import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
        import { UsersSchema } from "../../CRUD/users/schema/users.schema";
        import { ${controllerName}CMSController } from "./${controllerName.toLowerCase()}-cms.controller";
        import { ${serviceName}CMSService } from "./${serviceName.toLowerCase()}-cms.service";
        import { ${entityName}CMSSchema } from "./entities/${entityName.toLowerCase()}-cms.entity";
        
        @Module({
            imports: [
                JwtModule.registerAsync({
                    useClass: JwtConfigService
                }),
                MongooseModule.forFeature([
                    { name: 'Users', schema: UsersSchema },
                    { name: '${entityName.toLowerCase()}_cms', schema: ${entityName}CMSSchema },
                ]),
            ],
            controllers: [${controllerName}CMSController],
            providers: [${serviceName}CMSService, JwtHelper, DoSpacesService, DoSpacesServicerovider]
        })
        export class ${moduleName}CMSModule {
        }
    `;

    const moduleDir = path.join(
        process.cwd(),
        "src/modules/cms",
        moduleName.toLowerCase()
    );

    try {
        // Create Module Directory
        if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
        }

        const moduleFilePath = path.join(moduleDir, `${moduleName?.toLowerCase()}-cms.module.ts`);
        fs.writeFileSync(moduleFilePath, moduleTemplate);
    } catch (error) {
        console.error(`Error generating module ${moduleName}:`, error);
    }
}
