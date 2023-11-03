import { Module } from '@nestjs/common';

import { dataBaseProvider } from './database.providers';

@Module({
  providers: [...dataBaseProvider],
  exports: [...dataBaseProvider],
})
export class DatabaseModule {}
