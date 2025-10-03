const { Router } = require(`express`);
const router = Router();
const roomController = require("../controllers/roomController");

router.get("/room", (req,res) => {
    roomController
    .listar()
    .then((room) => res.status(200).json(room))
    .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
    })
});

router.post("/room", (req,res) => {
    const novaSala = req.body;
    roomController
    .criar(novaSala)
    .then((salaCriada) => res.status(201).json(salaCriada))
    .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
    });
});

router.put("/room/:id", (req,res) => {
    const {id} = req.params;
    const attSala = req.body;
    roomController
    .atualizar(attSala, id)
    .then((salaAtualizada) => res.status(200).json(salaAtualizada))
    .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
    });
 
});

router.delete("/room/:id", (req,res) => {
    const {id} = req.params;
    roomController
    .deletar(id)
    .then((salaDeletada) => res.status(200).json(salaDeletada))
    .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
    });
});


module.exports =  router;
