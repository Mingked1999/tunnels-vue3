const express = require('express');
const router = express.Router();
const dbConn = require('./sqlConnect.js');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret.js')
const url = require('url');
const lines = require('./data/chart.js')
/**
 * login api
 */
router.post('/login',(req,res)=>{
    //receive user side parameters: username, password
    const {username,password } = req.body;
    const sql = 'select * from user where username=? and password=?';
    dbConn(sql,[username,password],result=>{
        if(result.length > 0){
            //generate token
            const token = jwt.sign({
                id:result[0].id,
                username:result[0].username,
                permission:result[0].permission
            },jwtSecret.secret)
            //server response
            res.send({
                status:200,
                username:result[0].username,
                permission:result[0].permission,
                token
            })
        }else{
            res.send({
                status:500,
                message:'Username and Password not Matched'
            })
        }
    })
})
router.get('/lines',(req,res)=>{
    res.send({
        status:200,
        result:lines
    })
})
module.exports = router;