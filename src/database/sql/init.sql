CREATE database controlefinanceiro

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
	id_usuario uuid NOT null,
	valor float NOT NULL,
	descricao varchar(100) NOT NULL, 
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_rendas PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_rendas_01 ON rendas USING btree (id_usuario);
ALTER TABLE rendas ADD CONSTRAINT fk_rendas_01 FOREIGN KEY (id_usuario) REFERENCES usuarios(uuid);


CREATE TABLE IF NOT EXISTS despesas (
    uuid uuid DEFAULT uuid_generate_v4(),
	id_usuario uuid NOT null,
	valor float NOT NULL,
	descricao varchar(100) NOT NULL, 
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_despesas PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_despesas_01 ON despesas USING btree (id_usuario);
ALTER TABLE despesas ADD CONSTRAINT fk_despesas_01 FOREIGN KEY (id_usuario) REFERENCES usuarios(uuid);


CREATE TABLE IF NOT EXISTS saldos (
    uuid uuid DEFAULT uuid_generate_v4(),
	id_usuario uuid NOT null,
	renda float NOT NULL,
	despesa float NOT NULL, 
	saldo float NOT NULL,
	datahora timestamptz NOT NULL DEFAULT now(),

	CONSTRAINT pk_saldos PRIMARY KEY (uuid)
	
);
CREATE INDEX ix_saldos_01 ON saldos USING btree (id_usuario);
ALTER TABLE saldos ADD CONSTRAINT fk_saldo_01 FOREIGN KEY (id_usuario) REFERENCES usuarios(uuid);
