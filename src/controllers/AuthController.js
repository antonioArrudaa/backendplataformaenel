
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const connection = require('../database/connection');



const authConfig = require('../config/authConfig.json');


function genereteToken(params ={}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn:86400,
    });
}


module.exports = {

    async autheticade(request, response){

        const {br, senha}= request.body;

        const colaborador = await connection('dados_colaborador').where('br',br).select('id','br','name','senha', 'tiporegistro').first();

        if(!colaborador)
            response.status(404).json({'error':'Colaborador não encontrado'});

        if(senha!= colaborador.senha)
            response.status(400).json({'error':'Senha incorreta'});

        colaborador.senha = undefined;    

        return response.send({
            colaborador, 
            token: genereteToken({id: colaborador.id}),
    
        });
        //return response.json(token);
    },
    async autheticadeAPP(request, response){

        const {br, senha}= request.body;
        console.log({br,senha});

        const colaborador = await connection('dados_colaborador').where('br',br).select('id','br','name','empresa','regiao','tiporegistro','senha','error').first();

        if(!colaborador)
            response.status(404).json({results:[{colaborador:{error:'Colaborador não encontrado'}}]});

        if(senha!= colaborador.senha)
            response.status(400).json({results:[{dados:[{'error':'Senha incorreta'}]}]});

        colaborador.senha = undefined;    

        console.log(
            
            {results:[
            {dados:[{colaborador}]}, 
            {token: genereteToken({id: colaborador.id})},
    
        ]});

        return response.send(
            {results:[
                    {dados:[colaborador]},
                    {token: genereteToken({id: colaborador.id})}
            ]});
        //return response.json(token);
    },


    /*async register(request, response){
        const {br} = request.body;
        const colaborador = await connection('dados_colaborador').select('br');
        
        try{
            if(await colaborador.br == this.br)
                return response.status(400).json({'error':"Colaborador já cadastrado"});
            
                
            const user = await colaborador.

                
        }catch(err){

        }

        const colaborador = await connection('dados_colaborador').select('*');
        return response.json(colaborador);
    },*/
    
}
