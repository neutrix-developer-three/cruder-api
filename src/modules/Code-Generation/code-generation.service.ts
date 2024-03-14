import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { generateController, generateEntity } from 'src/utils/codeGenerator';

@Injectable()
export class CodeGenerationService {
    generate(data: any): void {
        const entityName = data.feature;
        const controllerName = data.feature;
        const schemaProperties = data.schemaProperties;
        generateEntity(entityName, schemaProperties);
        generateController(controllerName);
    }
}