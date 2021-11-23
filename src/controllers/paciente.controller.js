const mysqlConnection = require('../database');

function registrarPaciente(req,res){
    const { Persona,Peso,Estatura } = req.body;
    mysqlConnection.query('INSERT INTO PERSONA(dni,nombre,apellido_paterno,apellido_materno,sexo,fecha_nacimiento,edad,celular) VALUES (?,?,?,?,?,?,?,?)',[Persona.DNI,Persona.Nombre,Persona.Apellido_Paterno,Persona.Apellido_Materno,Persona.Sexo,Persona.Fecha_Nacimiento,Persona.Edad,Persona.Celular],(err,rows,fields)=>{
        if(!err){
            if(rows.affectedRows>0){
                /* res.json({status:"success",res:{id:rows.insertId}}); */
                mysqlConnection.query('INSERT INTO PACIENTE(persona_idpersona,peso,estatura) VALUES (?,?,?)',[rows.insertId,Peso,Estatura],(err,rows,fields)=>{
                    if(!err){
                        if(rows.affectedRows>0){
                            res.json({status:"success",res:rows});
                        }else{
                            res.json({status:"error",message:"No se registró correctamente"});
                        }
                    }else{
                        console.log(err);
                        res.json({status:"error",message:err.sqlMessage});
                    }
                })
            }else{
                res.json({status:"error",message:"No se registró correctamente"});
            }
        }else{
            console.log(err);
            res.json({status:"error",message:err.sqlMessage});
        }
    })
}

function obtenerPaciente(req,res){
    mysqlConnection.query('SELECT * FROM persona WHERE dni = ? ',[req.params.dni],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}

function registrarHistoriaClinica(req,res){
    const { Persona,Enfermedad,Alergeno,Pulso,Saturacion } = req.body;
    mysqlConnection.query('UPDATE paciente SET Enfermedad = ?,Alergeno = ?,Pulso = ?,Saturacion = ? WHERE Persona_idPersona = ?',[Enfermedad,Alergeno,Pulso,Saturacion,Persona.idPersona],(err,rows,fields)=>{
        if(!err){
            if(rows.affectedRows>0){
                /* res.json({status:"success",res:{id:rows.insertId}}); */
                res.json({status:"success",res:{filasAfectadas:rows.affectedRows}});
            }else{
                res.json({status:"error",message:"No se registró correctamente"});
            }
        }else{
            console.log(err);
            res.json({status:"error",message:err.sqlMessage});
        }
    })
}

module.exports = {registrarPaciente,obtenerPaciente,registrarHistoriaClinica};