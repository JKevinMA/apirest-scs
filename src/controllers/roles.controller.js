const mysqlConnection = require('../database');

function getRoles(req,res){
    mysqlConnection.query("SELECT * FROM rol",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}


module.exports = {getRoles};