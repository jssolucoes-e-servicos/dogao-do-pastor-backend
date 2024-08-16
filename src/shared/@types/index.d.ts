export type RequestWithUserType = Request & {
  user: {
    id: string;
    username: string;
    password: string;
  };
};

export type RequestWithUserDataType = Request & {
  user: {
    data: object;
  };
};
