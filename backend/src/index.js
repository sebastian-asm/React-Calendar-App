import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authRouter, eventsRouter } from './routes/index.js';
import dbConnection from './db/db.js';

// Variables de entorno
dotenv.config();

const server = express();
const router = Router();

// Configuraciones
dbConnection(); // Conexión a la db
server.use(cors());
server.use(express.json());
server.use('/api', router);

// Rutas
router.use('/auth', authRouter);
router.use('/events', eventsRouter);

server.listen(process.env.PORT, () =>
  console.log(`Servidor en puerto ${process.env.PORT}`)
);
