const express = require('express')


const router = express.Router();

router.get('/',(req, response)=>{
    response.send({ok:true});
});

module.exports = app = app.use('/verify', router);