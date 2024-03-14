
        import { Injectable } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { Test } from './entities/Test.entity';

        @Injectable()
        export class TestService {
            constructor(
                @InjectModel(Test.name) private readonly testModel: Model<Test>
            ) {}

            async findAll(): Promise<Test[]> {
                return this.testModel.find().exec();
            }

            async create(test: Test): Promise<Test> {
                const createdTest = new this.testModel(test);
                return createdTest.save();
            }
        }
    