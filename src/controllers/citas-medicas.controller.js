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
function obtenerCitasMedicas(req,res){
    mysqlConnection.query("SELECT pe.*,cm.Fecha,cm.Hora,IFNULL(cm.Asistencia,'--') as Asistencia FROM citamedica cm INNER JOIN persona pe ON pe.idPersona = cm.Paciente_Persona_idPersona ",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
            console.log(rows);
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}
module.exports = {registrarCitaMedica,obtenerCitasMedicas};