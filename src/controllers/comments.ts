import {query, Request, Response} from "express";
const dotenv = require("dotenv")
dotenv.config()
let query_data: any = []
let query_data_write: any = []
let result_status = true
let result_message: any = ""

// @ts-ignore
import dbconfig = require("../dbconfig");

// ########### End helper Methods ##############################
//
const connectDbRead = async (data: any, read: boolean, write: boolean, destination: string) => {
    try {

        if (read) {

            // set Db connection for write
            dbconfig.default.pg_client.connect(function (err: any, connection: any) {
                if (err) {
                    result_status = false
                    result_message = err.message
                    return console.error('error: ' + err.message);
                }

                let sql_read = "SELECT * FROM comments WHERE book_isbn=" + `'${data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql_read, function (err: any, result: any) {
                    if (err) {
                      result_status = false
                      result_message = err
                        console.log(err)
                      throw err;
                    }
                    query_data = result.rows
                    result_message = "Listed"
                    return result
                })
            });
        }

    } catch (error) {
        console.log(error)
    }
}

const connectDbWrite = async (data: any, read: boolean, write: boolean, destination: string) => {
    try {

        let sql_query = ""
        if (write) {

            // set query strings for Db function
            const now = new Date(Date.now()).toISOString();
            if(destination==="Created") {
               sql_query = "INSERT INTO comments (comment, commenter_ip_address, book_isbn,created_at,updated_at) VALUES (" + `'${data.comment}'` + "," + `'${data.ip_address}'` + "," + `'${data.isbn}'` + "," + `'${now}'` + "," + `'${now}'` + ")";
            }else if(destination==="Updated"){
                sql_query = "UPDATE comments  SET comment = `${data.comment}, commenter_ip_address = `${data.commenter_ip_address}`, book_isbn = `${data.book_isbn}`, created_at = `${data.book_isbn}`, updated_at = `${now}` WHERE id = `${comment_id}";

            }else if(destination==="Deleted"){
                sql_query = "DELETE FROM comments WHERE id = `${comment_id}`";

            }else{
              result_status = false
              result_message = "Invalid query string!"
              return result_message
            }

            // connection to db and run query
            dbconfig.default.pg_client.connect(function (err: any, connection: any) {
                if (err) throw err;
                connection.query(sql_query, function (err: any, result: any) {
                    if (err) {
                        result_status = false
                        result_message = err
                        throw err;
                    }
                    result_message = destination + "successfully"
                    return result
                })

                // Retrieve records for response data return
                let sql_read = "SELECT * FROM comments WHERE book_isbn=" + `'${data.isbn}'` + " ORDER BY created_at DESC";
                connection.query(sql_read, function (err: any, result: any) {
                    if (err) throw err;
                    query_data_write = result.rows
                })
            });

        }

    } catch (error) {
        console.log(error)
    }
}
//
// ########### End helper Methods ##############################


// ###########   API endpoints #################################
//
const createComment = async (req: Request, res: Response) => {
    let requestData = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let comment_data: any = {}

    requestData.forEach(function (value, index) {
        comment_data[value] = requestDatavalues[index]
    });
    connectDbWrite(comment_data, false, true, "Created").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: " + result_message,
        data: {comments: query_data_write}
    });
};

const updateComment = async (req: Request, res: Response) => {
    let requestData = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let comment_data: any = {}

    requestData.forEach(function (value, index) {
        comment_data[value] = requestDatavalues[index]
    });

    connectDbWrite(req.body, false, true, "Updated").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: " + result_message,
    });
};

const deleteComment = async (req: Request, res: Response) => {
    connectDbWrite(req.body, false, true, "Deleted").then(r => console.log(r))
    return res.status(200).json({
        status: result_status,
        message: "Comment: " + result_message,
    });
};

const getComments = async (req: Request, res: Response) => {
    connectDbRead(req.query, true, false, 'comments').then(r => console.log(r))
    return res.status(200).json({
        status: true,
        message: "Comments Listed",
        data: query_data
    });
};
//
// ###########   API endpoints #################################

export default {
    getComments,
    deleteComment,
    updateComment,
    createComment,
}
