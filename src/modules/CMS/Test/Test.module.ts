
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from './Test.service';
import { TestRepository } from './Test.repository';
import { Test, TestSchema } from './entities/Test.entity';
import { TestController } from './Test.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }])],
    controllers: [TestController],
    providers: [Test, TestRepository],
})
export class TestModule { }
