class Tables {
  init(conexao) {
    this.conexao = conexao;
    this.createTables();
  }

  createTables() {
    const sqlUsers = `
      CREATE TABLE IF NOT EXISTS users (
        usuario_id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        tipo_usuario ENUM('administrador','usuario') DEFAULT 'usuario',
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (usuario_id),
        UNIQUE KEY email_UNIQUE (email)
      );
    `;

    const sqlRooms = `
      CREATE TABLE IF NOT EXISTS rooms (
        sala_id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        capacidade INT NOT NULL,
        localizacao VARCHAR(255) DEFAULT NULL,
        recursos TEXT,
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (sala_id),
        UNIQUE KEY nome_UNIQUE (nome)
      );
    `;

    const sqlReserves = `
      CREATE TABLE IF NOT EXISTS reserves (
        reserva_id INT NOT NULL AUTO_INCREMENT,
        usuario_id INT DEFAULT NULL,
        sala_id INT DEFAULT NULL,
        data_reserva DATE NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fim TIME NOT NULL,
        descricao TEXT,
        status ENUM('ativa','cancelada','concluida') DEFAULT 'ativa',
        criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (reserva_id),
        UNIQUE KEY unique_sala_data_hora (sala_id, data_reserva, hora_inicio, hora_fim),
        KEY usuario_id_idx (usuario_id),
        CONSTRAINT reserves_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES users (usuario_id) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT reserves_ibfk_2 FOREIGN KEY (sala_id) REFERENCES rooms (sala_id) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `;

  
    this.conexao.query(sqlUsers, (error) => {
      if (error) {
        console.log("Erro ao criar a tabela users:", error);
        return;
      }
      console.log("Tabela users criada com sucesso");

      this.conexao.query(sqlRooms, (error) => {
        if (error) {
          console.log("Erro ao criar a tabela rooms:", error);
          return;
        }
        console.log("Tabela rooms criada com sucesso");

        this.conexao.query(sqlReserves, (error) => {
          if (error) {
            console.log("Erro ao criar a tabela reserves:", error);
            return;
          }
          console.log("Tabela reserves criada com sucesso");
        });
      });
    });
  }
}

module.exports = new Tables();
