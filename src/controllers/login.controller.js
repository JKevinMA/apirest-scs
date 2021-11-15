const mysqlConnection = require('../database');

function loginUsuario(req,res){
    const {usuario,contrasena} = req.body;
    mysqlConnection.query('SELECT * FROM personalmedico WHERE usuario=?',[usuario],(err,rows,fields)=>{
        if(!err){
            if(!rows[0]){
                res.json({status:"error",message:"Usuario no existe."});
            }else{
                mysqlConnection.query('SELECT p.Nombre,r.Descripcion as Rol FROM personalmedico pm INNER JOIN persona p ON pm.Persona_idPersona = p.idPersona INNER JOIN rol r ON pm.Rol_idRol = r.idRol WHERE pm.Usuario =? and pm.Contraseña = ?',[usuario,contrasena],(err,rows,fields)=>{
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

module.exports = {loginUsuario};