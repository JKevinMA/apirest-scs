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

module.exports = {registrarPaciente};