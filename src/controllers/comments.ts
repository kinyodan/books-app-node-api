import {query, Request, Response} from "express";
let mysql = require('mysql');
const dotenv = require("dotenv")
dotenv.config()
let query_data: any = []
let query_data_write: any = []
// @ts-ignore
import dbconfig = require("../dbconfig");

const connectDb = async (data: any, read: boolean, write: boolean, destination: string) => {
    try {
        let dbconnection = mysql.createPool(dbconfig);

        if (read) {
            dbconnection.getConnection(async function (err: any, connection:any) {
                console.log('Connected to the MySQL --- server.read_db');
                if (err) {
                    return console.error('error: ' + err.message);
                }
                let param_data = data
                let sql = "SELECT * FROM comments WHERE book_isbn=" + `'${param_data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql, function (err: any, result: any) {
                    if (err) throw err;
                    console.log(sql)
                    query_data = result
                })
                connection.release();
            });
        }
    } catch (error) {
        console.log(error)
    }
}

const connectDbWrite = async (data: any, read: boolean, write: boolean, destination: string) => {
    try {
        let connectionWrite = mysql.createPool(dbconfig);
        console.log("connectionWrite-------")
        console.log(dbconfig)
        console.log("connectionWrite-------")

        if (write) {
             connectionWrite.getConnection(function (err: any,connection: any) {
                 console.log('Connected to the MySQL --- server.write');
                 if (err) {
                    return console.error('error: ' + err.message);
                }
                let param_data = JSON.parse(data)
                let sql_write = "INSERT INTO comments (comment, commenter_ip_adress, book_isbn) VALUES (" + `'${param_data.comment}'` + "," + `'${param_data.ip_address}'` + "," + `'${param_data.isbn}'` + ")";
                 connection.query(sql_write, function (err: any, result: any) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    query_data_write = result
                })
                 connection.release();
             });

            connectionWrite.getConnection(function (err: any, connection: any) {
                console.log("comments getConnection for write ");
                if (err) {
                    return console.error('error: ' + err.message);
                }
                let param_data = JSON.parse(data)
                let sql_read = "SELECT * FROM comments WHERE book_isbn=" + `'${param_data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql_read, function (err: any, result: any) {
                if (err) throw err;
                console.log("comments list records retrieved ");
                query_data = result
                })
                connection.release();
            })

        }
    } catch (error) {
        console.log(error)
    }
}

const createComment = async (req: Request, res: Response) => {
    let requestData = Object.keys(req.body)[0]
    connectDbWrite(requestData,false,true,"comments").then(r => console.log(r))
    return res.status(200).json({
        status: true,
        message:"Comment saved Successfully",
        data: query_data_write
    });
};

const updateComment = async (req: Request, res: Response) => {
    connectDbWrite(req.body,false,true,"comments").then(r => console.log(r))
    return res.status(200).json({
        status: true,
        message:"Comments Updated Successfully",
    });
};

const deleteComment = async (req: Request, res: Response) => {
    connectDbWrite(req.body,false,true,"comments").then(r => console.log(r))
    return res.status(200).json({
        status: true,
        message:"Comment deleted Successfully",
    });
};

const getComments = async (req: Request, res: Response) => {
    connectDb(req.query,true,false,'comments').then(r => console.log(r))
    return res.status(200).json({
        status: true,
        message: "Comments Listed",
        data: query_data
    });
};

export default {
    getComments,
    deleteComment,
    updateComment,
    createComment,
}
