const mysql = require('mysql');
const mysqlConn = {
    host:'localhost',
    user:'root',
    password:'',
    database:'tunnels_vue3'
}

const pool = mysql.createPool(mysqlConn);
function dbConn(sql,arr,callback){
    pool.getConnection((err,connection)=>{
        if(err){ //if there is any error return error
            console.log(err)
            return;
        }
        connection.query(sql,arr,(err,result)=>{
            connection.release();  //release connection to avoid to much cache
            if(err){ //if there is any error return error
                console.log(err)
                return;
            }
            callback(result); //return result
        })
    })
}

module.exports = dbConn