import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { HeroSectionCmsSchema } from './schema/hero-section-cms.schema';
import { HeroSectionCmsController } from './hero-section-cms.controller';
import { HeroSectionCmsService } from './hero-section-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'hero_section_cms', schema: HeroSectionCmsSchema }
        ])
    ],
    controllers: [HeroSectionCmsController],
    providers: [HeroSectionCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class HeroSectionCmsModule {}
