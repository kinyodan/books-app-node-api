import {query, Request, Response} from "express";

let mysql = require('mysql');
const dotenv = require("dotenv")
dotenv.config()
let query_data: any = []
let query_data_write: any = []
let result_status = true
let result_message: any = ""

// @ts-ignore
import dbconfig = require("../dbconfig");

const connectDb = async (data: any, read: boolean, write: boolean, destination: string) => {
    try {
        let dbconnection = dbconfig.default.db_connection;

        if (read) {
            dbconnection.getConnection(async function (err: any, connection: any) {
                if (err) {
                    result_status = false
                    result_message = err.message
                    // return console.error('error: ' + err.message);
                }
                let sql = "SELECT * FROM comments WHERE book_isbn=" + `'${data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql, function (err: any, result: any) {
                    if (err) {
                        result_status = false
                        result_message = err.message
                        throw err;
                    }
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
        let connectionWrite = dbconfig.default.db_connection;
        if (write) {
            connectionWrite.getConnection(function (err: any, connection: any) {
                if (err) {
                    result_status = false
                    result_message = err
                    // return console.error('error: ' + err.message);
                }
                let sql_write = "INSERT INTO comments (comment, commenter_ip_adress, book_isbn) VALUES (" + `'${data.comment}'` + "," + `'${data.ip_address}'` + "," + `'${data.isbn}'` + ")";
                connection.query(sql_write, function (result: any) {
                    // if (err) {
                    //     result_status = false
                    //     result_message = err
                    //     throw err;
                    // }
                    console.log("1 record inserted");
                    query_data_write = result
                })
                connection.release();
            });

            connectionWrite.getConnection(function (err: any, connection: any) {
                if (err) {
                    result_status = false
                    result_message = err
                    // return console.error('error: ' + err.message);
                }
                let sql_read = "SELECT * FROM comments WHERE book_isbn=" + `'${data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql_read, function (result: any) {
                    // if (err) throw err;
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
    let requestData = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let comment_data: any = {}

    requestData.forEach(function (value, index) {
        comment_data[value] = requestDatavalues[index]
    });
    connectDbWrite(comment_data, false, true, "comments").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: "+ result_message,
        data: query_data_write
    });
};

const updateComment = async (req: Request, res: Response) => {
    connectDbWrite(req.body, false, true, "comments").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: "+ result_message,
    });
};

const deleteComment = async (req: Request, res: Response) => {
    connectDbWrite(req.body, false, true, "comments").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: "+result_message,
    });
};

const getComments = async (req: Request, res: Response) => {
    connectDb(req.query, true, false, 'comments').then(r => console.log(r))
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
