const reserveModel = require('../models/reserveModel');
const roomModel = require('../models/roomModel');
class roomController {
    listar(){
        return roomModel.listar();	
    }
    criar(novaSala){
        return roomModel.criar(novaSala);
    }
    alterar(dadosAtualizados,id){
        return roomModel.atualizar(dadosAtualizados,id);	
    }
    deletar(id){
        return roomModel.delete(id);	
    }
}

module.exports = new roomController();