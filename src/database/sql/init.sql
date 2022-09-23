CREATE TABLE IF NOT EXISTS usuarios(
    uuid uuid DEFAULT uuid_generate_v4(),
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    cpf bigserial NOT NULL,
    datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT id_usuarios PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS rendas (
    uuid uuid DEFAULT uuid_generate_v4(),
	idUsuario int8 NOT null,
	valor float NOT NULL,
	descricao varchar(100) NOT NULL, 
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_rendas PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_rendas_01 ON rendas USING btree (idUsuario);

ALTER TABLE rendas ADD CONSTRAINT fk_rendas_01 FOREIGN KEY (idUsuario) REFERENCES usuarios(uuid);

CREATE TABLE IF NOT EXISTS despesas (
    uuid uuid DEFAULT uuid_generate_v4(),
	idUsuario int8 NOT null,
	valor float NOT NULL,
	descricao varchar(100) NOT NULL, 
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_contas PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_contas_01 ON contas USING btree (idUsuario);

ALTER TABLE despesas ADD CONSTRAINT fk_contas_01 FOREIGN KEY (idUsuario) REFERENCES usuarios(uuid);

CREATE TABLE IF NOT EXISTS saldos (
    uuid uuid DEFAULT uuid_generate_v4(),
	idUsuario int8 NOT null,
	renda float NOT NULL,
	despesa float NOT NULL, 
	saldo float NOT NULL,
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_saldo PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_saldo_01 ON saldo USING btree (idUsuario);

ALTER TABLE saldos ADD CONSTRAINT fk_saldo_01 FOREIGN KEY (idUsuario) REFERENCES usuarios(uuid);
