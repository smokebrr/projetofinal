const conexao = require("../structure/conection");

class RoomModel {

    executaQuery(sql, parametros = "") {
        return new Promise((resolve, reject) => {
            conexao.query(sql, parametros, (error, resposta) => {
                if (error) {
                    return reject(error);
                }

                return resolve(resposta);
            });
        });
    }

    listar() {	
        const sql = "SELECT * FROM rooms";
        return this.executaQuery(sql);
    }
    criar(novaSala) {
        const sql = "INSERT INTO rooms SET ?";
        return this.executaQuery(sql, [novaSala]);
    }

    atualizar(dadosAtualizados, salaId) {
        const sql = "UPDATE rooms SET ? WHERE sala_id = ?";

        return this.executaQuery(sql, [dadosAtualizados, salaId]);
    }

    delete(salaId) {
        const sql = "DELETE FROM rooms WHERE sala_id = ?";

        return this.executaQuery(sql, [salaId]);
    }
}

module.exports = new RoomModel();