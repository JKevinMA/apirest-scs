const mysqlConnection = require('../database');

function getMedicos(req,res){
    mysqlConnection.query("SELECT me.PersonalMedico_Persona_idPersona as idPersona,CONCAT(pe.Nombre,' ',pe.Apellido_Paterno,' ',pe.Apellido_Materno) as Nombres FROM medico me INNER JOIN persona pe ON me.PersonalMedico_Persona_idPersona = pe.idPersona",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}


module.exports = {getMedicos};