export const configLoaderHelper = () => {
  return {
    app: {
      port: process.env.PORT,
      environment: process.env.ENVIRONMENT,
    },
    acelera: {
      whitelabel: '6059ca9db45467b09c419cb5',
    },
    database: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE,
    },
    ibm: {
      apiHost: process.env.IBM_APIHOST,
      apikey: process.env.IBM_APIKEY,
    },
  };
};
