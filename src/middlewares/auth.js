const jwt = require('jsonwebtoken');

const authConfig = require('../config/authConfig.json');


module.exports = (request, response , next) =>{

    const authHeader = request.headers.authorization;

    console.log(authHeader);
    //const d = request.authHeader.a

    if(!authHeader)
        return response.status(401).json({error:'Token de colaborador não informado'});

    //Beare ojspofjpsfdjpsofdgjdofgjj

    const parts = authHeader.split(' ');

    if(!parts.length ===2)
        return response.status(401).json({error:'Token error'});


    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return response.status(401).json({error:'Mal formato de token'});


    jwt.verify(token , authConfig.secret, (err, decoded) => {
        if(err) return response.status(401).json({results:[{error:'Token invalido'}]});
        //return response.send({results:[{"error":'Token invalido'}]});
    
        request.colaboradorId = decoded.id;
        return next();
    });




};