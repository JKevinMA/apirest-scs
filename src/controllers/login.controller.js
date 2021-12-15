const mysqlConnection = require('../database');

function loginUsuario(req,res){
    const {usuario,contrasena} = req.body;
    mysqlConnection.query('SELECT * FROM personalmedico WHERE usuario=?',[usuario],(err,rows,fields)=>{
        if(!err){
            if(!rows[0]){
                res.json({status:"error",message:"Usuario no existe."});
            }else{
                mysqlConnection.query('SELECT p.Nombre,r.Descripcion as Rol,Persona_idPersona FROM personalmedico pm INNER JOIN persona p ON pm.Persona_idPersona = p.idPersona INNER JOIN rol r ON pm.Rol_idRol = r.idRol WHERE pm.Usuario =? and pm.Contraseña = ?',[usuario,contrasena],(err,rows,fields)=>{
                    if(!err){
                        if(!rows[0]){
                            res.json({status:"error",message:"Contraseña incorrecta."});
                        }else{
                            res.json({status:"success",res:rows[0]});
                        }
                    }else{
                        console.log(err);
                        res.json({status:"error",message:err});
                    }
                });
            }
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}
function loginPaciente(req,res){
    const {usuario,contrasena} = req.body;
    mysqlConnection.query('SELECT * FROM usuariopaciente WHERE usuario=?',[usuario],(err,rows,fields)=>{
        if(!err){
            if(!rows[0]){
                res.json({status:"error",message:"Usuario no existe."});
            }else{
                mysqlConnection.query("SELECT p.idPersona as Persona_idPersona,p.Dni,p.Nombre,'Paciente' as Rol,up.usuario FROM usuariopaciente up INNER JOIN persona p ON up.idPersona = p.idPersona WHERE up.usuario =? and up.contrasena = ?",[usuario,contrasena],(err,rows,fields)=>{
                    if(!err){
                        if(!rows[0]){
                            res.json({status:"error",message:"Contraseña incorrecta."});
                        }else{
                            res.json({status:"success",res:rows[0]});
                        }
                    }else{
                        console.log(err);
                        res.json({status:"error",message:err});
                    }
                });
            }
        }else{
            console.log(err);
            res.json({status:"error",message:err});
        }
    })
}
function registrarUsuarioPACIENTE(req,res){
    const {idPersona,usuario,contrasena} = req.body;
    mysqlConnection.query('INSERT INTO USUARIOPACIENTE VALUES (?,?,?)',[idPersona,usuario,contrasena],(err,rows,fields)=>{
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
}

module.exports = {loginUsuario,registrarUsuarioPACIENTE,loginPaciente};