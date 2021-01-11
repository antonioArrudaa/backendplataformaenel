const express = require('express');

const cors = require('cors'); 


const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', routes);

app.listen(3335);

/**
 * Rota / Recursos
 */

/**
 * Medotos HTTP:
 * 
 * GET: Buscar/Listar uma informaçao do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * n
 */


 /**
  * Tipos de parametros:
  * 
  * Query Params: Parametros nomeados enviados na rota apos "?"(Filtros, paginação)
  * Route Params: Parametros utilizados para identificar recursos
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * 
  */

  /**
   * SQL: MySQL, SQLite
   * NoSQL: MongoDB
   * 
   */

   /**
    * Driver do BD: SELECT * FROM users
    * Query Builder: table('users').select('*').where
    */





