import { Gender } from '../types';

export class MedicDTO {
  name: string;
  middleName?: string;
  lastNames: string;
  birthdate: Date;
  medicId: string;
  email: string;
  gender: Gender;
}
