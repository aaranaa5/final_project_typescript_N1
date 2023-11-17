import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationServices } from './authentication.services';
import { authenticationProviders } from './authentication.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationServices, ...authenticationProviders],
})
export class AuthenticationModule {}
