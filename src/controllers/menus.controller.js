const mysqlConnection = require('../database');

function getMenus(req,res){
    const {idRol}=req.query;
    mysqlConnection.query('select A.idPrivilegio,A.idRol, B.Descripcion from permisos A left join modulos B on A.idModulo=B.idModulo where B.status<>0 and A.status<>0 and A.idRol = ?',[idRol],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
}


module.exports = {getMenus};