import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('health-check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerStatus(): Record<string, string> {
    return this.appService.getServerStatus();
  }
}
