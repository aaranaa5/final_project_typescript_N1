import { Roles } from "../types/authentication.types";

export class AuthenticationDTO {
  user: string;
  password: string;
  role: Roles;
}

export class AuthenticationResponseDTO {
  message: string;
  role: Roles;
}
