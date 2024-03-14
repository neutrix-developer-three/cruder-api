
        import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
        import { Document } from 'mongoose';

        @Schema()
        export class Test extends Document {
            @Prop() Phone: string;
@Prop() Name: string;
@Prop() Name: string;
        }

        export const TestSchema = SchemaFactory.createForClass(Test);
    