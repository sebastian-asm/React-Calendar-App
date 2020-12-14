import { response, request } from 'express';
import jwt from 'jsonwebtoken';

const validateJwt = (req = request, res = response, next) => {
  try {
    const token = req.header('x-token');

    if (!token)
      return res.status(401).json({
        ok: false,
        message: 'No se encontró el token',
      });

    // Obteniendo el payload del token
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'El token no es válido',
    });
  }
};

export default validateJwt;
