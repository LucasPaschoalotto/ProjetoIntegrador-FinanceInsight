CREATE TABLE IF NOT EXISTS application_usuarios(
    uuid uuid DEFAULT uuid_generate_v4(),
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    cpf BIGINT NOT NULL,
    PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS application_conta(
    uuid uuid DEFAULT uuid_generate_v4(),
    numero INT NOT NULL,
    saldo INT NOT NULL,
    usuarioID INT NOT NULL,
    PRIMARY KEY (uuid),
    CONSTRAINT FK_application_usuarios FOREIGN KEY (uuid)
    REFERENCES application_usuarios(uuid)
);

INSERT INTO application_usuarios (nome, email, cpf) VALUES ('user', 'user@email.com', 11122233345);
INSERT INTO application_conta (numero, saldo) VALUES
