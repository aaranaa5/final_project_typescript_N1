import { Gender, IdentificationTypes, Status } from '../types';

export class AffiliateDTO {
  name: string;
  middleName?: string;
  lastNames: string;
  birthdate: Date;
  identificationType: IdentificationTypes;
  id: string;
  phoneNumber?: string;
  cellPhoneNumber: string;
  postalCode: string;
  address: string;
  country: string;
  city: string;
  email: string;
  gender: Gender;
  status: Status;
  socialStratum: number;
  sisben: boolean;
  requiresCompany: boolean;
}
