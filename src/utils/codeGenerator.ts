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
        import { Document } from 'mongoose';

        @Schema()
        export class ${entityName} extends Document {
            ${properties}
        }

        export const ${entityName}Schema = SchemaFactory.createForClass(${entityName});
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

        const componentFilePath = path.join(componentDir, `${entityName}.entity.ts`);
        fs.writeFileSync(componentFilePath, entityTemplate);
    } catch (error) {
        console.error(`Error generating entity ${entityName}:`, error);
    }
}

export function generateController(controllerName: string): void {
    const controllerTemplate = `
        import { Controller, Get, Post, Body } from '@nestjs/common';
        import { ${controllerName}Service } from './${controllerName}.service';
        import { ${controllerName} } from './entities/${controllerName}.entity';

        @Controller('${controllerName}')
        export class ${controllerName}Controller {
            constructor(private readonly ${controllerName}Service: ${controllerName}Service) {}

            @Get()
            async findAll(): Promise<${controllerName}[]> {
                return this.${controllerName}Service.findAll();
            }

            @Post()
            async create(@Body() ${controllerName.toLowerCase()}: ${controllerName}): Promise<${controllerName}> {
                return this.${controllerName}Service.create(${controllerName.toLowerCase()});
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

        const componentFilePath = path.join(componentDir, `${controllerName}.controller.ts`);
        fs.writeFileSync(componentFilePath, controllerTemplate);
    } catch (error) {
        console.error(`Error generating controller ${controllerName}:`, error);
    }
}


