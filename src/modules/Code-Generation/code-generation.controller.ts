import { Controller, Post, Body } from '@nestjs/common';
import { CodeGenerationService } from './code-generation.service';
import { Constants } from 'src/utils/constants';

@Controller({ path: "code-generation", version: Constants.API_VERSION_1 })
export class CodeGenerationController {
    constructor(private readonly codeGenerationService: CodeGenerationService) { }

    @Post()
    generateCode(@Body() data: any): { success: boolean } {
        this.codeGenerationService.generate(data);
        return { success: true };
    }
}