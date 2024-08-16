import type { RoleEnumType } from 'src/shared/@types/roles.type';

export class UsersCreateDto {
  name: string;
  role: RoleEnumType;
  username: string;
  email?: string;
  password: string;
}
