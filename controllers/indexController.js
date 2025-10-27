const express = require("express");
const router = express.Router();
const db = require("../config/db");
const infoCarrera = require("../controllers/infoCarrera");

exports.getIndex = (req, res) => {
    return infoCarrera.getInfoCarrera(req, res);
};
