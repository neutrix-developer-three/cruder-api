import { Controller, Post, Body } from '@nestjs/common';
import { CodeGenerationService } from './code-generation.service';
import { Constants } from 'src/utils/constants';

@Controller({ path: "code-generation", version: Constants.API_VERSION_1 })
export class CodeGenerationController {
    constructor(private readonly codeGenerationService: CodeGenerationService) { }

    @Post()
    generateCode(@Body() data: any): { success: boolean } {
        // Handle code generation logic here using the service
        const entityName = data.entityName;
        const controllerName = data.controllerName;
        this.codeGenerationService.generate(entityName, controllerName);
        return { success: true };
    }
}