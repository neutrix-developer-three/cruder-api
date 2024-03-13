import {Module} from '@nestjs/common';
import {DoSpacesService} from './SpacesService/doSpacesService';
import {DoSpacesServicerovider} from './SpacesService';
import {SpacesController} from './spaces.controller';

@Module({
    imports: [],
    controllers: [SpacesController],
    // provide both the service and the custom provider
    providers: [DoSpacesServicerovider, DoSpacesService],
})
export class SpacesModule {
}