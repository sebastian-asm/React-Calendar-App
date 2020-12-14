import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, loginUser, validatedToken } from '../controllers/auth.js';
import validateFields from '../middlewares/validate-fields.js';
import validateJwt from '../middlewares/validate-jwt.js';

const authRouter = Router();

authRouter.post(
  '/',
  [
    check('email', 'El email válido es necesario').escape().trim().isEmail(),
    check('password', 'La contraseña debe tener un mínimo de 5 carácteres')
      .escape()
      .trim()
      .isLength({ min: 5 }),
    validateFields,
  ],
  loginUser
);

authRouter.post(
  '/new',
  [
    check('name', 'El nombre es necesario').escape().trim().notEmpty(),
    check('email', 'El email válido es necesario').escape().trim().isEmail(),
    check('password', 'La contraseña debe tener un mínimo de 5 carácteres')
      .escape()
      .trim()
      .isLength({ min: 5 }),
    validateFields,
  ],
  createUser
);

authRouter.get('/renew', validateJwt, validatedToken);

export default authRouter;
