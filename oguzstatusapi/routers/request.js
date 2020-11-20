const router = require("express").Router();
const dbUrl = process.env.NODE_ENV_DB_URL
const curl = require('curl');
router.get('/',async(req,res)=> {
    
    curl.get(dbUrl,function(err,response,body) {
    if( typeof response !== 'undefined'){
        return res.status(200).json({Details:"I'm on "+dbUrl,Status:200})
    }else{
        res.status(503).json({Details:"MongoDB is not Alive",Status:503});
    }
    });

})

module.exports = router;