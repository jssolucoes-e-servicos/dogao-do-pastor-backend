import { Request } from '@nestjs/common';

export type RequestWithUserType = Request & {
  user: {
    id: string;
    email: string;
    password: string;
  };
};

export type RequestWithUserDataType = Request & {
  user: {
    data: object;
  };
};
