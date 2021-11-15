const mysqlConnection = require('../database');
/* var crypto = require('crypto'); */

function getUsuarios(req,res){
    mysqlConnection.query('SELECT * FROM personalmedico',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
}

/* function getUsuarioById(req,res){
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM USUARIOS WHERE ID = ?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
}



function createUsuario(req,res){
    const { user,password } = req.body;
    mysqlConnection.query('INSERT INTO USUARIOS(USER,PASSWORD) VALUES (?,?)',[user,password],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'usuario guardado'});
        }else{
            console.log(err);
        }
    })
}

function updateUsuario(req,res){
    const {id} = req.params;
    const {user,password } = req.body;
    mysqlConnection.query('UPDATE USUARIOS SET USER=?, PASSWORD=? WHERE ID=?',[user,password,id],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'usuario actualizado'});
        }else{
            console.log(err);
        }
    })
}

function deleteUsuario(req,res){
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM USUARIOS WHERE ID=?',[id],(err,rows,fields)=>{
        if(!err){
            res.json({Status:'usuario eliminado'});
        }else{
            console.log(err);
        }
    })
}
 */
function loginUsuario(req,res){
    const {usuario,contrasena} = req.body;
    /* const hash = crypto.createHash('sha256').update(password).digest('hex'); */
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

/* module.exports = {getUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario,loginUsuario}; */
module.exports = {getUsuarios,loginUsuario};