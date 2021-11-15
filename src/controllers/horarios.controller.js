const mysqlConnection = require('../database');

function getHorarios(req,res){
    mysqlConnection.query("SELECT idHorario, CONCAT(Dias_Lab,' | ',Hora_Inicio,' - ',Hora_Fin) as Turno FROM horario",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}


module.exports = {getHorarios};