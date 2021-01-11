const express = require('express');

const authMiddleware = require('../src/middlewares/auth');


const ColaboradorController = require('./controllers/ColaboradorController');

const Alerta = require('./controllers/AlertasController');

const RelatorioController = require('./controllers/RelatorioController');

const LDFController = require('./controllers/LDFController');

const AuthController = require('./controllers/AuthController');

const routes = express.Router();


/*routes.get('/autheticade/login',(req, response)=>{
    response.send({"ok":"Sucesso"});
});
*/
//routes.use(authMiddleware);
/*
routes.get('/', (req, res)=>{
    res.send({ok:true, user: req.colaboradorId});
});*/


//Gera token de autenticacao do usuario

routes.post('/autheticade', AuthController.autheticade);
routes.post('/autheticadeapp', AuthController.autheticadeAPP);



routes.use(authMiddleware);

//TESTEEEEE AQUIIIIIII
routes.post("/validatoken", authMiddleware);
//=====================================================================================





//----------------------------------- CRUD Colaborador

//Exibindo um ou todos colaborador (es)
routes.get("/colaboradores",ColaboradorController.index);
routes.get('/colaborador/:id',ColaboradorController.show);
routes.post("/verificabr0/",ColaboradorController.VerficaBR0);


routes.post('/filtroChave', ColaboradorController.filtraChave);




//Cadastrando ou atualizando um Colaborador
routes.post("/newcolaborador",ColaboradorController.create);

routes.put('/colaborador/:id',ColaboradorController.update);

//Deletando um colaborador
routes.delete('/colaborador/:id',ColaboradorController.destroy);



//Login
routes.post("/appsession",ColaboradorController.login);//Login


//----------------------------------- CRUD LDF

//Exibindo um , todos ou LDF por br0 (es)
routes.get("/ldfs",LDFController.index);
routes.get('/ldf/:id',LDFController.showRLG);// apresentra o ldf de acordo com o id do mesmo
routes.get('/localizacaoldf', LDFController.localizacao);


//Baixa os Alimentadores
routes.post("/listaAlm",LDFController.showALM);
//Baixa os Localizadores
routes.post("/listldfsporalm",LDFController.showL_Localizadores);
//Baixa os Religadores
routes.post("/listRLGporalm",LDFController.listReligadores);



//Cadastrando ou atualizando um LDF
routes.post("/ldf/newldf",LDFController.create);

routes.post('/ldf/searchldf',LDFController.seach_LDF);
routes.put('/ldfatt/:id',LDFController.update);

//Deletando um LDF
routes.delete('/ldf/:tombamento',LDFController.destroy);



//----------------------------------- CRUD Relatorio

//Exibindo um , todos ou relatorio por br0 (es)
routes.get("/relatorios",RelatorioController.index);
routes.get('/relatorio/:id',RelatorioController.showR);
routes.get("/relatoriosporbr/:br",RelatorioController.showR_BR);

//Cadastrando ou atualizando um relatorio
routes.post("/newrelatorio",RelatorioController.create);
routes.put('/relatorio/:id',RelatorioController.update);

//Deletando um relatorio
routes.delete('/relatorio/:id',RelatorioController.destroy);


//----------------------------------- CRUD Alerta
//Exibindo um , todos ou alerta por br0 (es)
routes.get("/alerta",Alerta.index);
routes.get('/alerta/:id',Alerta.showA);
routes.get("/alerta/:br",Alerta.listAlertsBR);

//Listando Alertas por status
routes.get('/alertstatus1',Alerta.status1);
routes.get('/alertstatus2',Alerta.status2);
routes.get('/alertstatus3',Alerta.status3);

//Cadastrando ou atualizando um alerta
routes.post("/newalert",Alerta.create);
routes.put('/alerta/:id',Alerta.update);

//Deletando um alerta
routes.delete('/alerta/:id',Alerta.destroy);


module.exports = routes;