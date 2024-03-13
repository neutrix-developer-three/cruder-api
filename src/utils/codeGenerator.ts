import * as fs from 'fs';
import * as path from 'path';

export function generateEntity(entityName: string): void {
    const entityTemplate = `
        export class ${entityName} {
            // entity properties and methods
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules",
        entityName,
        "entities"
    );

    try {
        // Create Entity Directory
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true });
        }

        const componentFilePath = path.join(componentDir, `${entityName}.entities.ts`);
        fs.writeFileSync(componentFilePath, entityTemplate);
    } catch (error) {
        console.error(`Error generating entity ${entityName}:`, error);
    }
}

export function generateController(controllerName: string): void {
    const controllerTemplate = `
        import { Controller } from '@nestjs/common';

        @Controller('${controllerName}')
        export class ${controllerName}Controller {
            // controller methods
        }
    `;

    const componentDir = path.join(
        process.cwd(),
        "src/modules",
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

