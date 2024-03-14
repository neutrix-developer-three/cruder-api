import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { generateController, generateEntity, generateModule, generateRepository, generateService } from 'src/utils/codeGenerator';

@Injectable()
export class CodeGenerationService {
    generate(data: any): void {
        const entityName = data.feature;
        const controllerName = data.feature;
        const serviceName = data.feature;
        const repositoryName = data.feature;
        const moduleName = data.feature;
        const schemaProperties = data.schemaProperties;
        generateEntity(entityName, schemaProperties);
        generateController(controllerName);
        generateService(serviceName, entityName);
        generateRepository(repositoryName, entityName);
        generateModule(moduleName, serviceName, repositoryName, entityName, controllerName);
    }
}