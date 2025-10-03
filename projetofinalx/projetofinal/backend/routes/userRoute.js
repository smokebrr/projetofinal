const { Router } = require('express');
const router = Router();
const userController = require("../controllers/userController");
const autenticar = require('../middlewares/authMiddleware');


router.post("/login", (req, res) => {
    userController.login(req, res); 
});


router.get("/user", autenticar, (req, res) => {
    userController.listar(req, res);
});


router.post("/user", (req, res) => {
    userController.criar(req, res);
});

router.put("/user/:id", autenticar, (req, res) => {
    userController.alterar(req, res); 
});


router.delete("/user/:id", autenticar, (req, res) => {
    userController.deletar(req, res);  
});

module.exports = router;
