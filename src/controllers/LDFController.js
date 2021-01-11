const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const ldf = await connection('dados_ldf').select('*');
        return response.json(ldf);
    },

    async localizacao(request, response){
        const ldf = await connection('dados_ldf').select('id','latitude','longitude','alimentador', 'religador','regiao','tombamento', 'cidade');
        return response.json(ldf);
    },

    async showRLG(request, response){
        const params = request.params.id;
        
        const ldf = await connection('dados_ldf').where('id', params).select('*').first();
        
        return response.json(ldf);
    },

    async showALM(request, response){
        const {alimentador} = request.body;

        
        const ldf = await connection('dados_ldf').where('alimentador', alimentador).select('error','alimentador').first();


        if(!ldf){
            response.status(404).json({results:[{error:'Alimentador não encontrado'}]});
        }
        
        return response.json({results:[ldf]});
    },

    async seach_LDF(request, response){
            const {tombamento} = request.body;
            const ldf = await connection('dados_ldf').where('tombamento', tombamento).select('*').first();
    
            if(tombamento===''){
                return response.send({error:'Campos Vazios'});
            }else{
                if(ldf !==undefined){
                    if(tombamento === ldf.tombamento){
                        return response.send({results:[{"success":'LDF ENCONTRADO',
                            "id":ldf.id
                            , "id":ldf.id
                            , "cidade":ldf.cidade
                            , "regiao":ldf.regiao
                            , "alimentador":ldf.alimentador
                            , "religador":ldf.religador
                            , "tombamento":ldf.tombamento
                            , "valorDoCurto":ldf.valordocurto
                            , "tipoDeCurto":ldf.tipodocurto
                            , "Lat":ldf.latitude
                            , "Long":ldf.longitude
                            , "distancia":ldf.distancia
                            , "registroAtivo":ldf.registroativo
                            , "data_atualizacao":ldf.dataatualizacao
                            , "status":ldf.statusldf
                            , "retornoMensagem":ldf.error
                            }]});
                    }else{
                        console.error(tombamento);
                        return response.send({results:[{"success":'LDF NÃO ENCONTRADO'}]});
                    }
                }else{
                    console.error(tombamento);
                    return response.send({results:[{"success":'LDF NÃO ENCONTRADO'}]});
                }
            }
    },



    async showL_Localizadores(request, response){
        const {alimentador} = request.body;
        console.log(alimentador);
        const ldf = await connection('dados_ldf').where('alimentador', alimentador).select(
        'cidade','alimentador','religador','tombamento','valordocurto','tipodocurto','latitude',
        'longitude','distancia','registroativo');
        
        console.log(ldf.religador);
        return response.json({results:ldf});
    },

    async listReligadores(request, response){
        const {alimentador} = request.body;

        const dadosldf = await (await connection('dados_ldf').where( 'alimentador',alimentador ).select('error','religador','alimentador').groupBy('religador'));

        if(!dadosldf){
            response.status(404).json({results:[{error:'Alimentador não encontrado'}]});
        }

        return response.json({results:dadosldf});
    },

    async create(request, response){
        const { cidade, alimentador, regiao, religador, tombamento, valordocurto, tipodocurto, latitude, longitude, distancia, registroativo}   =  request.body;

        const ano = new Date().getFullYear();
        const mes = new Date().getMonth();
        const dia = new Date().getDate();
        const datacadastro = dia+'/'+mes+'/'+ano;

        const id = crypto.randomBytes(3).toString('HEX');
    
        await connection('dados_ldf').insert({
            id,
            cidade,
            alimentador,
            regiao,
            religador,
            tombamento,
            valordocurto,
            tipodocurto,
            latitude,
            longitude,
            distancia,
            registroativo,
            datacadastro
        })
        
        //console.log(data);

        return response.json({id, cidade, alimentador, religador, tombamento, registroativo});
    },

    async update(request, response){
        const params = request.params.id;
        const relatorio = await connection('dados_ldf').where('id', params).update(request.body,{new:true});
        
        return response.json({results:[{status:relatorio}]});

    },
    async destroy(request, response){
        const params = request.params.id;
        
        const relatorio = await connection('dados_ldf').where('tombamento', params).delete();
        
        return response.send();

    }




};