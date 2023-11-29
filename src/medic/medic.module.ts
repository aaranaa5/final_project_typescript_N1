import { Module } from '@nestjs/common';
import { MedicController } from './medic.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MedicServices } from './medic.services';
import { medicProviders } from './medic.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicController],
  providers: [MedicServices, ...medicProviders],
})
export class MedicModule {}
