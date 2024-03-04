import jwt from 'jsonwebtoken';

export const jwtGenerate = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        err
          ? (console.log(err), reject('The token could not be generated'))
          : resolve(token);
      }
    );
  });
};
