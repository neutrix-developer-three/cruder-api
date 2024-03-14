
        import { Injectable } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { Test } from './entities/Test.entity';

        @Injectable()
        export class TestRepository {
            constructor(
                @InjectModel(Test.name) private readonly testModel: Model<Test>
            ) {}

            async findAll(): Promise<Test[]> {
                return this.testModel.find().exec();
            }

            async findById(id: string): Promise<Test | null> {
                return this.testModel.findById(id).exec();
            }

            async create(test: Test): Promise<Test> {
                const createdTest = new this.testModel(test);
                return createdTest.save();
            }

            async update(id: string, test: Test): Promise<Test | null> {
                return this.testModel.findByIdAndUpdate(id, test, { new: true }).exec();
            }

            async delete(id: string): Promise<Test | null> {
                return this.testModel.findByIdAndDelete(id).exec();
            }
        }
    