const mysqlConnection = require('../database');

function registrarDiagnostico(req,res){
    const { Indice_Predictivo,Medico_idPersona,Paciente_idPersona} = req.body;
    mysqlConnection.query('INSERT INTO diagnostico (Indice_Predictivo,Fecha,Medico_idPersona,Paciente_idPersona) VALUES (?,now(),?,?)',[Indice_Predictivo,Medico_idPersona,Paciente_idPersona],(err,rows,fields)=>{
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
function obtenerIdentificaciones(req,res){
    /* mysqlConnection.query("SELECT pe.*,cm.Fecha,cm.Hora FROM citamedica cm INNER JOIN persona pe ON pe.idPersona = cm.Paciente_Persona_idPersona ",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
            console.log(rows);
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    }) */
}
module.exports = {registrarDiagnostico,obtenerIdentificaciones};