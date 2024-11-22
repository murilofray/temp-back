require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Rotas especificas
import contasRouter from './modulos/prestacao-contas/contasRouter';
import docentesRouter from './modulos/gestao-docentes/docentesRouters';
import academicoRouter from './modulos/gestao-academica/academicoRouters';
import comumRouters from './comum/comumRouters';

const PORT = process.env.BACKEND_PORT || 3333;
const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/docs', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Direcionamento para as rotas especificas de módulo ou comuns
app.use('/api', comumRouters);
app.use('/api/contas', contasRouter);
app.use('/api/docentes', docentesRouter);
app.use('/api/academica', academicoRouter);

app.listen(PORT as number, () => console.log(`Listening on all interfaces:${PORT}\n-------------\n`));
