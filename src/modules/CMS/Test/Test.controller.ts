
        import { Controller, Get, Post, Body } from '@nestjs/common';
        import { TestService } from './Test.service';
        import { Test } from './entities/Test.entity';

        @Controller('Test')
        export class TestController {
            constructor(private readonly TestService: TestService) {}

            @Get()
            async findAll(): Promise<Test[]> {
                return this.TestService.findAll();
            }

            @Post()
            async create(@Body() test: Test): Promise<Test> {
                return this.TestService.create(test);
            }
        }
    