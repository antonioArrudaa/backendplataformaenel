const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const relatorio = await connection('dados_relatorio_consulta').select('*');
        return response.json(relatorio);
    },

    async showR(request, response){
        const params = request.params.id;
        
        const relatorio = await connection('dados_relatorio_consulta').where('id', params).select('*').first();
        
        return response.json(relatorio);
    },

    async showR_BR(request, response){
        const params = request.params.br;
    
        const relatorio = await connection('dados_relatorio_consulta').where('br', params).select('*');
        
        return response.json(relatorio);
    },

    async create(request, response){
        const { cidade,regiao, alimentador,religador, tombamento,valordocurto, tipodocurto,
                latitude, longitude, distancia, descricao, br, data, hora, foto1, foto2,
                foto3, foto4, foto5, registroativo,  dataatualizacao}   =  request.body;

        const id = crypto.randomBytes(7).toString('HEX');

        const statusrelatorio = "1"
    
       const respo = await connection('dados_relatorio_consulta').insert({
            id,
            cidade,
            regiao,
            alimentador,
            religador,
            tombamento,
            valordocurto,
            tipodocurto,
            latitude,
            longitude,
            distancia,
            descricao,
            br,
            data,
            hora,
            foto1,
            foto2,
            foto3,
            foto4,
            foto5,
            registroativo
        });

        return response.send({results:[{statusrelatorio}]});

        //return response.send({results:[
         //   {id,br,cidade,alimentador,religador,tombamento, valordocurto, tipodocurto,
         //       descricao,data,hora}]});

        //return response.json({id,br,cidade,alimentador,religador,tombamento, valordocurto, tipodocurto,
                              //  descricao,data,hora});
    },

    async update(request, response){
        const params = request.params.id;
        const relatorio = await connection('dados_relatorio_consulta').where('id', params).update(request.body,{new:true});
        
        return response.json(relatorio);

    },
    async destroy(request, response){
        const params = request.params.id;
        const relatorio = await connection('dados_relatorio_consulta').where('id', params).delete();
        
        return response.send();

    }

};