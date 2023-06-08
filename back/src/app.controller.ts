import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './models/App';

@Controller('api/apps')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getApps(): App[] {
        try {
            return this.appService.getApps();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
