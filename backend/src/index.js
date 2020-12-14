import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authRouter } from './routes/index.js';
import dbConnection from './db/db.js';

// Variables de entorno
dotenv.config();

const server = express();

// Configuraciones
dbConnection(); // Conexión a la db
server.use(cors());
server.use(express.json());

// Rutas
server.use('/api/auth', authRouter);

server.listen(process.env.PORT, () =>
  console.log(`Servidor en puerto ${process.env.PORT}`)
);
