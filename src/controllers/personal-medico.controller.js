const mysqlConnection = require('../database');

function registrarPersonalMedico(req,res){
    const { Persona,Horario_idHorario,Rol_idRol,Correo,Usuario,Contrasena } = req.body;
    mysqlConnection.query('INSERT INTO PERSONA(dni,nombre,apellido_paterno,apellido_materno,sexo,fecha_nacimiento,edad,celular) VALUES (?,?,?,?,?,?,?,?)',[Persona.DNI,Persona.Nombre,Persona.Apellido_Paterno,Persona.Apellido_Materno,Persona.Sexo,Persona.Fecha_Nacimiento,Persona.Edad,Persona.Celular],(err,rows,fields)=>{
        if(!err){
            if(rows.affectedRows>0){
                /* res.json({status:"success",res:{id:rows.insertId}}); */
                mysqlConnection.query('INSERT INTO PERSONALMEDICO(persona_idpersona,horario_idhorario,rol_idrol,correo,usuario,contraseña) VALUES (?,?,?,?,?,?)',[rows.insertId,Horario_idHorario,Rol_idRol,Correo,Usuario,Contrasena],(err,rows,fields)=>{
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
function obtenerPersonalMedico(req,res){
    mysqlConnection.query("SELECT pe.*,pm.correo,pm.usuario,pm.contraseña as contrasena,r.Descripcion as rol FROM persona pe INNER JOIN personalmedico pm ON pm.Persona_idPersona = pe.idPersona INNER JOIN rol r ON pm.Rol_idRol = r.idRol ",[],(err,rows,fields)=>{
        if(!err){
            res.json({status:"success",res:rows});
            console.log(rows);
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}
module.exports = {registrarPersonalMedico,obtenerPersonalMedico};