import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthenticationServices } from './authentication.services';
import { authenticationSchema } from './dto';
import {
  AuthenticationDTO,
  AuthenticationResponseDTO,
} from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationServices) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async find(
    @Body() authentication: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    try {
      console.log('authentication,', authentication);

      const { user, password } =
        await authenticationSchema.validateAsync(authentication);

      console.log('passed');

      const authenticationValidated = await this.authenticationService.find(
        user,
        password,
      );

      if (!authenticationValidated) {
        throw new HttpException(
          'user or password are wrong',
          HttpStatus.FORBIDDEN,
        );
      }

      return {
        message: 'user and password are correct',
        role: authenticationValidated.role
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus());
      }

      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
