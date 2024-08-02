import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import autorizarAcesso from "./middlewares/autorizarAcesso.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Endpoint HTTP básico
app.get('/', (req, res) => {
  res.send('WebSocket server is running.');
});

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarAcesso);

nspUsuarios.on("connection", (socket) => {
    registrarEventosInicio(socket, nspUsuarios);
    registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
    registrarEventosCadastro(socket, io);
    registrarEventosLogin(socket, io);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
