const crypto = require('crypto');
const connection = require('../database/connection');
const FCM = require('fcm-node');
const serverKey = 'AAAADVB8z-8:APA91bEYkqabzgfM35NTnTATBouT0vkVKSCS60-X7dYOlNHHUIWutc-C37B__ff0aKoRJG2ju2dnFy6Bn32bxuiXvjFbOHvuaeyodHedzdoICwTjxLzakXwvQTrWS1MBP9xyRiIJL4QI'; //put your server key here
const fcm = new FCM(serverKey);

module.exports = {


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
            id,
            titulo,descricao,dataocorrencia,horaocorrencia,cidade, alimentador, regiao, religador, 
                tombamento, valordocurto, tipodocurto, br,chavedispositivo, registroativo, datacadastroalerta,
                statusalerta
        });
        
        //console.log(data);

        const message = {
            to: 'registration_token', 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: 'Title of your push notification', 
                body: 'Body of your push notification' 
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
                
                return response.json(alertaCadastrado);

            }
        });


        
    },

    //Lista todos os dados
    async index(request, response){
        const colaborador = await connection('dados_colaborador').select('*');
        return response.json(colaborador);
    }

    
};