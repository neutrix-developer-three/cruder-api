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
        export class ${entityName}Entity extends AbstractDocument {
            ${properties}
        }

        export const ${entityName}Schema = SchemaFactory.createForClass(${entityName}Entity);
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        entityName,
        "entities"
    );

    try {
        // Create Entity Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${entityName?.toLowerCase()}.entity.ts`);
        fs.writeFileSync(componentFilePath, entityTemplate);
    } catch (error) {
        console.error(`Error generating entity ${entityName}:`, error);
    }
}

export function generateController(controllerName: string): void {
    const controllerTemplate = `
        import { Controller, Get, Post, Body } from '@nestjs/common';
        import { ${controllerName}Service } from './${controllerName}.service';
        import { ${controllerName}Entity } from './entities/${controllerName}.entity';

        @Controller('${controllerName}')
        export class ${controllerName}Controller {
            constructor(private readonly ${controllerName}Service: ${controllerName}Service) {}

            @Get()
            async findAll(): Promise<${controllerName}Entity[]> {
                return this.${controllerName}Service.findAll();
            }

            @Post()
            async create(@Body() ${controllerName.toLowerCase()}Dto: ${controllerName}Entity): Promise<${controllerName}Entity> {
                return this.${controllerName}Service.create(${controllerName.toLowerCase()}Dto);
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        controllerName
    );

    try {
        // Create Controller Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${controllerName.toLowerCase()}.controller.ts`);
        fs.writeFileSync(componentFilePath, controllerTemplate);
    } catch (error) {
        console.error(`Error generating controller ${controllerName}:`, error);
    }
}

export function generateService(serviceName: string, entityName: string): void {
    const serviceTemplate = `
        import { Injectable } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { ${entityName}Entity } from './entities/${entityName}.entity';

        @Injectable()
        export class ${serviceName}Service {
            constructor(
                @InjectModel(${entityName}Entity.name) private readonly ${entityName.toLowerCase()}Model: Model<${entityName}Entity>
            ) {}

            async findAll(): Promise<${entityName}Entity[]> {
                return this.${entityName.toLowerCase()}Model.find().exec();
            }

            async create(${entityName.toLowerCase()}Dto: ${entityName}Entity): Promise<${entityName}Entity> {
                const created${entityName} = new this.${entityName.toLowerCase()}Model(${entityName.toLowerCase()}Dto);
                return created${entityName}.save();
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        serviceName
    );

    try {
        // Create Service Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${serviceName?.toLowerCase()}.service.ts`);
        fs.writeFileSync(componentFilePath, serviceTemplate);
    } catch (error) {
        console.error(`Error generating service ${serviceName}:`, error);
    }
}

export function generateRepository(repositoryName: string, entityName: string): void {
    const repositoryTemplate = `
        import { Injectable } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { ${entityName}Entity } from './entities/${entityName}.entity';

        @Injectable()
        export class ${repositoryName}Repository {
            constructor(
                @InjectModel(${entityName}Entity.name) private readonly ${entityName.toLowerCase()}Model: Model<${entityName}Entity>
            ) {}

            async findAll(): Promise<${entityName}Entity[]> {
                return this.${entityName.toLowerCase()}Model.find().exec();
            }

            async findById(id: string): Promise<${entityName}Entity | null> {
                return this.${entityName.toLowerCase()}Model.findById(id).exec();
            }

            async create(${entityName.toLowerCase()}Dto: ${entityName}Entity): Promise<${entityName}Entity> {
                const created${entityName} = new this.${entityName.toLowerCase()}Model(${entityName.toLowerCase()}Dto);
                return created${entityName}.save();
            }

            async update(id: string, ${entityName.toLowerCase()}Dto: ${entityName}Entity): Promise<${entityName}Entity | null> {
                return this.${entityName.toLowerCase()}Model.findByIdAndUpdate(id, ${entityName.toLowerCase()}Dto, { new: true }).exec();
            }

            async delete(id: string): Promise<TestEntity | null> {
                const deletedEntity = await this.testModel.findByIdAndDelete(id).exec();
                return deletedEntity ? (deletedEntity as any) as TestEntity : null;
            }
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules/cms",
        repositoryName
    );

    try {
        // Create Repository Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${repositoryName?.toLowerCase()}.repository.ts`);
        fs.writeFileSync(componentFilePath, repositoryTemplate);
    } catch (error) {
        console.error(`Error generating repository ${repositoryName}:`, error);
    }
}

export function generateModule(moduleName: string, serviceName: string, repositoryName: string, entityName: string, controllerName: string): void {
    const moduleTemplate = `
        import { Module } from '@nestjs/common';
        import { MongooseModule } from '@nestjs/mongoose';
        import { ${serviceName}Service } from './${serviceName}.service';
        import { ${repositoryName}Repository } from './${repositoryName}.repository';
        import { ${entityName}Entity, ${entityName}Schema } from './entities/${entityName}.entity';
        import { ${controllerName}Controller } from './${controllerName}.controller';

        @Module({
            imports: [MongooseModule.forFeature([{ name: ${entityName}Entity.name, schema: ${entityName}Schema }])],
            controllers: [${controllerName}Controller],
            providers: [${serviceName}Service, ${repositoryName}Repository],
        })
        export class ${moduleName}Module {}
    `;

    const moduleDir = path.join(
        process.cwd(),
        "src/modules/cms",
        moduleName
    );

    try {
        // Create Module Directory
        if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
        }

        const moduleFilePath = path.join(moduleDir, `${moduleName?.toLowerCase()}.module.ts`);
        fs.writeFileSync(moduleFilePath, moduleTemplate);
    } catch (error) {
        console.error(`Error generating module ${moduleName}:`, error);
    }
}
