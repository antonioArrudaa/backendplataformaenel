exports.up = function(knex) {
    return knex.schema.createTable('dados_relatorio_consulta', function(table){
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
        table.string('descricao').notNullable();
        table.string('br').notNullable();
        table.string('data').notNullable();
        table.string('hora').notNullable();
        table.string('foto1').notNullable();
        table.string('foto2').notNullable();
        table.string('foto3').notNullable();
        table.string('foto4').notNullable();
        table.string('foto5').notNullable();
        table.string('registroativo').notNullable();
        table.string('statusrelatorio');
        table.string('dataatualizacao');
        table.string('error');
    });
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('dados_relatorio_consulta');
  };
  