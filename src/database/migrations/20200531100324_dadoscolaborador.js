exports.up = function(knex) {
    return knex.schema.createTable('dados_colaborador', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('br').notNullable();
        table.string('empresa').notNullable();
        table.string('regiao').notNullable();
        table.string('senha').notNullable();
        table.string('chave').notNullable();
        table.string('tiporegistro').notNullable();
        table.string('dataregistro').notNullable();
        table.string('statususer');
        table.string('error');
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('dados_colaborador');
  };