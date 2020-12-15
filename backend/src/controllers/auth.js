import { response, request } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import generateToken from '../helpers/jwt.js';

export const createUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        ok: false,
        message: 'El email ya está registrado',
      });

    user = new User(req.body);

    // Encriptando la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardando el nuevo usuario
    await user.save();

    // Generando token
    const token = await generateToken(user.id, user.name);

    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente',
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

export const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        ok: false,
        message: 'Las credenciales de acceso no son válidas',
      });

    // Comprobando las contraseñas
    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass)
      return res.status(400).json({
        ok: false,
        message: 'Las credenciales de acceso no son válidas',
      });

    // Generando token
    const token = await generateToken(user.id, user.name);

    res.json({
      ok: true,
      message: 'Login correcto',
      user: {
        uid: user._id,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Hubo un error en la petición',
      error,
    });
  }
};

export const validatedToken = async (req = request, res = response) => {
  const { uid, name } = req;
  const token = await generateToken(uid, name);

  res.json({
    ok: true,
    messsage: 'Token regenerado exitosamente',
    new_token: token,
  });
};
