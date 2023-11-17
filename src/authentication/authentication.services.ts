import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IAuthentication } from './interfaces';
import { AuthenticationResponseDTO } from './dto';

@Injectable()
export class AuthenticationServices {
  constructor(
    @Inject('AUTHENTICATION')
    private readonly AuthenticationModel: Model<IAuthentication>,
  ) {}

  async find(
    user: string,
    password: string,
  ): Promise<AuthenticationResponseDTO[]> {
    return this.AuthenticationModel.findOne({
      user,
      password,
    });
  }
}
