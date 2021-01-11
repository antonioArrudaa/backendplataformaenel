
exports.up = function(knex) {
    return knex.schema.createTable('dados_chamados', function(table){
        table.string('id').primary();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('dataocorrencia').notNullable();
        table.string('horaocorrencia').notNullable();
        table.string('cidade').notNullable();
        table.string('regiao').notNullable();
        table.string('alimentador').notNullable();
        table.string('religador').notNullable();
        table.string('tombamento').notNullable();
        table.string('valordocurto').notNullable();
        table.string('tipodocurto').notNullable();
        table.string('br').notNullable();
        table.string('chavedispositivo').notNullable();
        table.string('registroativo').notNullable();
        table.string('datacadastroalerta').notNullable();
        table.string('statusalerta').notNullable();
        table.string('dataatualizacao');
        table.string('error');
        
    });
};

exports.down = function(knex) {
  
};
