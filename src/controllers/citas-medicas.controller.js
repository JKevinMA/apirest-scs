const mysqlConnection = require('../database');

function registrarCitaMedica(req,res){
    const { Paciente_Persona_idPersona,Fecha,Hora} = req.body;
    mysqlConnection.query('INSERT INTO citamedica (Paciente_Persona_idPersona,Fecha,Hora) VALUES (?,?,?)',[Paciente_Persona_idPersona,Fecha,Hora],(err,rows,fields)=>{
        if(!err){
            if(rows.affectedRows>0){
                /* res.json({status:"success",res:{id:rows.insertId}}); */
                res.json({status:"success",res:{id:rows.insertId}});
            }else{
                res.json({status:"error",message:"No se registró correctamente"});
            }
        }else{
            console.log(err);
            res.json({status:"error",message:err.sqlMessage});
        }
    })
}

module.exports = {registrarCitaMedica};