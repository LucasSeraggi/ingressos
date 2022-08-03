
const express = require('express');
const mongoose = require('mongoose');

const database = require('./db.config');

mongoose.Promise = global.Promise;

mongoose.connect(database.local.localDatabaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Banco de Dados foi conectado com sucesso!');
  }, (err) => {
    console.log(`Erro ao conectar com o Banco de Dados: ${err}`);
    process.exit();
  });
