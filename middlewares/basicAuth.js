const { BASIC_AUTH_LOGIN, BASIC_AUTH_PASSWORD } = process.env;

import auth from 'basic-auth';

export default async (req, res, next) => {
  const user = auth(req);

  if (!!user && user.name === BASIC_AUTH_LOGIN && user.pass === BASIC_AUTH_PASSWORD) {
    return next();
  }

  return res.set({ 'WWW-Authenticate': 'Basic' }).send(401);
};
