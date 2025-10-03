const { Router } = require("express");
const router = Router();
const reserveController = require("../controllers/reserveController");

router.get("/reserve", (req, res) => {
  reserveController
    .listar()
    .then((reserve) => res.status(200).json(reserve))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

router.post("/reserve", (req, res) => {
  const novaReserva = req.body;
  reserveController
    .criar(novaReserva)
    .then((reservaCriada) => res.status(201).json(reservaCriada))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

router.put("/reserve/:id", (req, res) => {
  const { id } = req.params;
  const attReserva = req.body;
  reserveController
    .atualizar(attReserva, id)
    .then((resultReservaAtualizada) => res.status(200).json(resultReservaAtualizada))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

router.delete("/reserve/:id", (req, res) => {
  const { id } = req.params;
  reserveController
    .deletar(id)
    .then((resultReservaDeletada) => res.status(200).json(resultReservaDeletada))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;
