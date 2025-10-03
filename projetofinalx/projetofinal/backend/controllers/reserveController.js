const reserveModel = require("../models/reserveModel");

class ReserveController {
  
    listar() {
        return reserveModel.listar();
    }
    
    criar(novaReserva) {
        return reserveModel.criar(novaReserva);	
    }
    
    atualizar(dadosAtualizados, id) {
        return reserveModel.atualizar(dadosAtualizados, id);
    }
    
    deletar(id) {
        return reserveModel.delete(id);
    }
}

module.exports = new ReserveController();
