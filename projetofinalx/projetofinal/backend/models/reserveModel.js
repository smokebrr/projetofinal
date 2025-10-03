const conexao = require("../structure/conection");

class ReserveModel {
  executaQuery(sql, parametros = "") {
    return new Promise((resolve, reject) => {
      conexao.query(sql, parametros, (error, resposta) => {
        if (error) {
          return reject(error);
        }
      
      return resolve(resposta);
  }) ;
  });
  }
  
  listar() {
    const sql = "SELECT * FROM reserves";
    return this.executaQuery(sql);
  }
  
  criar(novaReserva) {
    const sql = "INSERT INTO reserves SET ?";
    return this.executaQuery(sql, [novaReserva]);
  }
  
  atualizar(dadosAtualizados, reservaId) {
    const sql = "UPDATE reserves SET ? WHERE reserva_id = ?";
     return this.executaQuery(sql, [dadosAtualizados, reservaId]);
  
  }
  
  delete(reservaId) {
    const sql = "DELETE FROM reserves WHERE reserva_id = ?";
    return this.executaQuery(sql, [reservaId]);
    
  }
}

module.exports = new ReserveModel();
