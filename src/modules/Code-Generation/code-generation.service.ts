import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { generateController, generateEntity } from 'src/utils/codeGenerator';

@Injectable()
export class CodeGenerationService {
    generate(entityName: string, controllerName: string): void {
        generateEntity(entityName);
        generateController(controllerName);
    }
}