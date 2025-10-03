const express = require("express");
const routerReserves = require("./reserveRoute");
const routerRooms = require("./roomRoute");
const routerUsers = require("./userRoute");
const routerAuth = require("./authRoute");
const autenticar  = require("../middlewares/authMiddleware");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use( routerRooms);
    app.use( routerUsers);
    app.use( routerAuth);
    app.use( routerReserves); 

};
