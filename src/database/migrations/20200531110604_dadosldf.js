
exports.up = function(knex) {
    return knex.schema.createTable('dados_ldf', function(table){
        table.string('id').primary();
        table.string('cidade').notNullable();
        table.string('regiao').notNullable();
        table.string('alimentador').notNullable();
        table.string('religador').notNullable();
        table.string('tombamento').notNullable();
        table.string('valordocurto').notNullable();
        table.string('tipodocurto').notNullable();
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.string('distancia').notNullable();
        table.string('registroativo').notNullable();
        table.string('datacadastro').notNullable();
        table.string('dataatualizacao');
        table.string('statusldf');
        table.string('error');
        
    });
};

exports.down = function(knex) {
  
};
