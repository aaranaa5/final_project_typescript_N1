import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IAuthentication } from './interfaces';
import { AuthenticationDTO, AuthenticationResponseDTO } from './dto';

@Injectable()
export class AuthenticationServices {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly AuthenticationModel: Model<IAuthentication>,
  ) {}

  async find(
    user: string,
    password: string,
  ): Promise<AuthenticationDTO> {
    return this.AuthenticationModel.findOne({
      user,
      password,
    });
  }
}
