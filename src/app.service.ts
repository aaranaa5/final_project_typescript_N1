import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): Record<string, string> {
    return {
      message: 'Server up and running',
    };
  }
}
