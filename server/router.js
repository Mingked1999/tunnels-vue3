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
/**
 * return all prject records
 */
router.get('/project/all',(req,res)=>{
    //query and pagination
    var page = url.parse(req.url,true).query.page || 1; //????
    const sql = 'select * from project order by id desc limit 10 offset ' + (page-1) * 10;
    dbConn(sql,null,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                message:'no records'
            })
        }
    })
})
/**
 * search project by keywords
 */
router.get("/project/search",(req,res)=>{
    //receive params
    const keyword = url.parse(req.url,true).query.keyword;
    const sql = "SELECT * FROM project where concat(`name`,`location`,`remark`) LIKE '%" + keyword + "%'";
    dbConn(sql,null,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                message:'no records'
            })
        }
    })
})
/**
 * return total number of pages
 */
router.get('/project/page-number',(req,res)=>{
    const sql = "SELECT count(*) FROM project";
    dbConn(sql,null,result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:500,
                message:'no records'
            })
        }
    })
})
/**
 * Insert new Project to database
 */
router.post('/project/create',(req,res)=>{
    const {name,series,costs,location,duration,startTime,endTime,quantity,status,remark } = req.body;
    const sql = 'insert into project values(null,?,?,?,?,?,?,?,?,?,?)';
    const details = [name,series,costs,location,duration,startTime,endTime,quantity,status,remark];
    dbConn(sql,details,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                message:'Project Created'
            })
        }else{
            res.send({
                status:500,
                message:'Create Failed'
            })
        }
    })
})
/**
 * delete project by Id
 */
router.get('/project/delete',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = 'DELETE FROM project WHERE id=?';
    dbConn(sql,id,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                message:'Project Deleted'
            })
        }else{
            res.send({
                status:500,
                message:'Deletion Failed'
            })
        }
    })
})
/**
 * update project by id
 */
router.get('/project/update/pre',(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql = 'select * from project where id=?';
    dbConn(sql,[id],result=>{
        if(result.length > 0){
            res.send({
                status:200,
                result:result[0]
            })
        }else{
            res.send({
                status:500,
                message:'no records'
            })
        }
    })
})
/**
 * restFul API
 */
router.put(("/project/update/:id"),(req,res)=>{
    const id = req.params.id;
    const {name,series,costs,location,duration,startTime,endTime,quantity,status,remark } = req.body;
    const sql = 'update project set name=?,series=?,costs=?,location=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?';
    const details = [name,series,costs,location,duration,startTime,endTime,quantity,status,remark,id];
    dbConn(sql,details,result=>{
        if(result.affectedRows > 0){
            res.send({
                status:200,
                message:'Project updated'
            })
        }else{
            res.send({
                status:500,
                message:'Operation Failed'
            })
        }
    })
    
})
module.exports = router;