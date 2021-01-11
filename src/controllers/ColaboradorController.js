const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    //Lista todos os dados
    async index(request, response){
        const colaborador = await connection('dados_colaborador').select('*');
        return response.json(colaborador);
    },

    //Lista todos os dados de um determinado colaborador
    async show(request, response){
        const params = request.params.id;
        
        const colaborador = await connection('dados_colaborador').where('id', params).select('*').first();
        
        return response.json(colaborador);
    },

    //Verifica se o BR0 está disponivel para o colaborador
    async VerficaBR0(request, response){
        const {br} = request.body;
        const colaborador = await connection('dados_colaborador').where('br', br).select('*').first();

        if(br===''){
            return response.send({error:'Campos Vazios'});
        }else{
            if(colaborador !==undefined){
                if(br === colaborador.br){
                    return response.send({results:[{"error":'BR já existente'}]});
                }else{
                    console.error(br);
                    return response.send({results:[{"error":'BR0 Disponível'}]});
                }
            }else{
                console.error(br);
                return response.send({results:[{"error":'BR0 Disponível'}]});
            }
        }
    },


    //Cria um novo usuario/colaborador
    async create(request, response){


        const { name, br, empresa, regiao, senha, chave, tiporegistro}   =  request.body;


        const verifica = await connection('dados_colaborador').where('br',br).select('*').first();
        //console.log(verifica);

        if(br===''|| name===''||empresa===''||regiao===''||senha===''||chave===''||tiporegistro===''){
            return response.send({error:'Campos Vazios'});
        }else{
            if(verifica !==undefined){
                if(br === verifica.br){
                    return response.send({error:'BR já existente'});
                }else{
                    const id = crypto.randomBytes(4).toString('HEX');

                    const ano = new Date().getFullYear();
                    const mes = new Date().getMonth();
                    const dia = new Date().getDate();
                    const dataregistro = dia+'/'+mes+'/'+ano;
                
    
                    const result =  await connection('dados_colaborador').insert({
                        id,
                        name,
                        br,
                        empresa,
                        regiao,
                        senha,
                        chave,
                        tiporegistro,
                        dataregistro,
                    });
    
                    console.log("Data de registro: "+dataregistro);
                    //const encripSenha = crypto.randomBytes(8).toString(senha);
    
                    return response.send({id:id, name:name, br:br, senha:id});
                }
                console.log('verifica no if->');
            }else{
                console.log('verifica no else');
                console.log('Prosseguindo para cadastro');
                const id = crypto.randomBytes(4).toString('HEX');

                const ano = new Date().getFullYear();
                const mes = new Date().getMonth();
                const dia = new Date().getDate();
                const dataregistro = dia+'/'+mes+'/'+ano;
            

                const result =  await connection('dados_colaborador').insert({
                    id,
                    name,
                    br,
                    empresa,
                    regiao,
                    senha,
                    chave,
                    tiporegistro,
                    dataregistro,
                });

                console.log("Data de registro: "+dataregistro);
                //const encripSenha = crypto.randomBytes(8).toString(senha);

                return response.send({id:id, name:name, br:br, senha:senha});

            }
        }

    },

    async filtraChave(request, response){
        const { br}   =  request.body;


        const filtro = await connection('dados_colaborador').where('br',br).select('chave').first();
        //console.log(verifica);

        if(br===''){
            return response.send({error:'Campos Vazios'});
        }else{
            if(filtro !==undefined){
                  
                    return response.send({chave:filtro.chave});
               
                console.log('verifica no if->');
            }
        }
    }

    ,

    //Login feito diretamente pela plataforma
    async loginWeb(request, response){
        const error='Dados Incorretos';
        const {br,senha} = request.body;

        const dadoscolaborador = await connection('dados_colaborador').where('br',br).select('id','br','name','empresa','regiao','senha','tiporegistro','error').first();

        if(br===''||senha===''){
            return response.json({results:[{"error":'Campos vazio!'}]}); //OK
        }else{
            //const verifica = dadoscolaborador;
            //console.log(verifica);
            if(!dadoscolaborador){
                //console.log('Entrou no IF');
                
                return response.json({results:[{"error":'Senha incorreta'}]});
                   
            }else{
                //console.log('Entrou no Else');
                //if(br==dadoscolaborador.br){
                
              
                if(dadoscolaborador.senha==senha){
                    if(dadoscolaborador.tiporegistro==1){
                        console.log('Colaborador');
                        return response.json({results:[{"error":'Colaborar'}]});
                    }else if(dadoscolaborador.tiporegistro==0){
                        console.log('Administrador');
                        return response.json({results:[dadoscolaborador]});
                    }
                }
                return response.json({results:[{"error":'Senha incorreta'}]});
               // }
               // return response.json({results:{"error":'BR0 não existe!'}});
            }
            
        }
    },

    //Login feito diretamente pelo app
    async login(request, response){
        const error='Dados Incorretos';
        const {br,senha} = request.body;

        const dadoscolaborador = await connection('dados_colaborador').where('br',br).select('id','br','name','empresa','regiao','senha','tiporegistro','error').first();

        if(br===''||senha===''){
            return response.json({results:[{"error":'Campos vazio!'}]}); //OK
        }else{
            //const verifica = dadoscolaborador;
            //console.log(verifica);
            if(!dadoscolaborador){
                //console.log('Entrou no IF');
                
                return response.json({results:[{"error":'Senha incorreta'}]});
                   
            }else{
                //console.log('Entrou no Else');
                //if(br==dadoscolaborador.br){
                
              
                if(dadoscolaborador.senha==senha){
                    if(dadoscolaborador.tiporegistro==1){
                        console.log('Colaborador');
                        return response.json({results:[{"error":'Colaborar'}]});
                    }else if(dadoscolaborador.tiporegistro==0){
                        console.log('Administrador');
                        return response.json({results:[dadoscolaborador]});
                    }
                }
                return response.json({results:[{"error":'Senha incorreta'}]});
               // }
               // return response.json({results:{"error":'BR0 não existe!'}});
            }
            
        }
    },
    
    //Atualiza os dados de um colaborador
    async update(request, response){
        const params = request.params.id;

        const colaborador = await connection('dados_colaborador').where('id', params).update(request.body,{new:true});
        
        return response.json(colaborador);

    },

    //Apaga um colaborador
    async destroy(request, response){
        const params = request.params.id;
        const colaborador = await connection('dados_colaborador').where('id', params).delete();
        
        return response.send();

    }

};