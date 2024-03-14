
        import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
        import { AbstractDocument } from '../../../../core/abstract-entity';
        
        @Schema({ timestamps: true, id: true, versionKey: false })
        export class TestCMS extends AbstractDocument {
            @Prop() Phone: string;
@Prop() Name: string;
        }
        
        export const TestCMSSchema = SchemaFactory.createForClass(TestCMS);
    