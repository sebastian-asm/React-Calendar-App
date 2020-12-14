import jwt from 'jsonwebtoken';

const generateToken = (uid, name) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid, name },
      process.env.SECRET_JWT_SEED,
      { expiresIn: '2h' },
      (error, token) => {
        if (error) {
          console.log(eror);
          return reject('Error al generar el token');
        }
        resolve(token);
      }
    );
  });
};

export default generateToken;
