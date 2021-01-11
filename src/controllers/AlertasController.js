const crypto = require('crypto');
const connection = require('../database/connection');
const notificationServer = require('../config/apiNotification.json');

const FCM = require('fcm-node');
const serverKey = 'AAAADVB8z-8:APA91bEYkqabzgfM35NTnTATBouT0vkVKSCS60-X7dYOlNHHUIWutc-C37B__ff0aKoRJG2ju2dnFy6Bn32bxuiXvjFbOHvuaeyodHedzdoICwTjxLzakXwvQTrWS1MBP9xyRiIJL4QI'; //put your server key here
const fcm = new FCM(serverKey);

module.exports = {

    //Lista todos os alertas cadastradps
    async index(request, response){
        const alertas = await connection('dados_chamados').select('*');

        if(alertas.length==0){
            return response.json({error:'Lista de Alertas vazia'});    
        }
        return response.json(alertas);
    },

    /*async localizacao(request, response){
        const ldf = await connection('dados_chamados').select('id','latitude','longitude');
        return response.json(ldf);
    },*/

    //Lista Alerta de determinado id
    async showA(request, response){
        const params = request.params.id;
        
        const alertas = await connection('dados_chamados').where('id', params).select('*').first();
        
        return response.json(alertas);
    },
    //Lista alertas em status 1
    async status1(request, response){
        const params = request.body;
        
        const alertas1 = await connection('dados_chamados').where('statusalerta', 1).select('statusalerta');
        //const alertas = await connection('dados_chamados').where('id', params).select('*').first();
        
        return response.send(alertas1);
    },
    //Lista alertas em status 2
    async status2(request, response){
        const params = request.body;
        
        const alertas2 = await connection('dados_chamados').where('statusalerta', 2).select('statusalerta');
        //const alertas = await connection('dados_chamados').where('id', params).select('*').first();
        
        return response.json(alertas2);
    },
    //Lista alertas em status 3
    async status3(request, response){
        const params = request.body;
        
        const alertas3 = await connection('dados_chamados').where('statusalerta', 3).select('statusalerta');
        //const alertas = await connection('dados_chamados').where('id', params).select('*').first();
        
        return response.json(alertas3);
    },

    async listAlertsBR(request, response){
        const params = request.params.br;

        //const {br} = request.body;

        const dadosldf = await (await connection('dados_chamados').where( 'br',params).select('*').groupBy('br'));

        if(!dadosldf){
            return response.status(400).json({error: "Não encontramos a regiao, ela pode nao ter sido adicionada."});
        }

        return response.json({results:dadosldf});
    },


    //Cria dados de um novo alerta
    async create(request, response){
        const { titulo,descricao,dataocorrencia,horaocorrencia,cidade, alimentador, regiao, religador, 
                tombamento, valordocurto, tipodocurto, br,chavedispositivo, registroativo,
                statusalerta}   =  request.body;    

        const ano = new Date().getFullYear();
        const mes = new Date().getMonth();
        const dia = new Date().getDate();
        const datacadastroalerta = dia+'/'+mes+'/'+ano;

        const id = crypto.randomBytes(3).toString('HEX');
    
        const alertaCadastrado = await connection('dados_chamados').insert({
            id,titulo,descricao,dataocorrencia,horaocorrencia,cidade, alimentador, regiao, religador, 
                tombamento, valordocurto, tipodocurto, br,chavedispositivo, registroativo, datacadastroalerta,
                statusalerta
        });
        

        

        const tituloMensagem = "ALERTA DE OCORRÊNCIA NO ALIMENTADOR: "+ alimentador;
        const corpoMensagem = "OCORRÊNCIA NO RELIGADOR: "+ religador +".\n DESCRIÇÃO DA OCORRÊNCIA:"+ descricao+"\nDATA: "+datacadastroalerta+" | HORARIO: "+horaocorrencia+"\nCSI AFETADO: "+tombamento+"\nTIPO DO CURTO: "+tipodocurto+"\nVALOR DO CURTO: "+valordocurto+"\nCIDADE: "+cidade+" | REGIÃO: "+regiao;

       

        const message = {
            to: chavedispositivo, 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: tituloMensagem, 
                body: corpoMensagem 
            },
            
            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        }

        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                
                console.log("Successfully sent with response: ", response);
                

            }
        });

        return response.json(alertaCadastrado);
    },

    async update(request, response){
        const params = request.params.id;
        const alertaUpdate = await connection('dados_chamados').where('id', params).update(request.body,{new:true});
        
        return response.json(alertaUpdate);

    },
    async destroy(request, response){
        const params = request.params.id;
        
        const alertaDestroy = await connection('dados_chamados').where('id', params).delete();
        
        return response.send();

    }




};