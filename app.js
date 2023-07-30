require("dotenv").config();
const express = require("express");
const Cliente = require("./src/models/cliente");
const { clientValidation, cleanName } = require("./src/middleware/validators");
const { generateUniqueId } = require("./src/middleware/helpers");
const app = require("./src/server");
const routes = require("./src/routes");

app.use(express.json());
app.use(routes);

module.exports = app;