const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const express = require('express');
const SaveAllCountries = require('./src/controllers/SaveAllCountries.js'); // Ajusta la ruta al controlador
const routes = require('.//src/routes/index.js');
const app = express();
const cors = require('cors');


const startServer = async () => {
  // Llama a SaveAllCountries al inicio
  
  // Sincroniza la base de datos
  try {
    await conn.sync({ force: false });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
  
  try {
    await SaveAllCountries();
    console.log('Datos de países guardados correctamente');
  } catch (error) {
    console.error('Error al guardar datos de países:', error);
  }
  
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Configura tus rutas
  app.use('/', routes);


  // Escucha en el puerto
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
};

startServer();