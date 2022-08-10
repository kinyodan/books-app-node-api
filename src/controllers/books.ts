import { Request, Response } from "express";
let mysql = require("mysql");
import axios, { AxiosResponse } from "axios";
const dotenv = require("dotenv");
dotenv.config();
let books_query_data: any = []

// helper methods - SCROLL DOWN FOR API ENDPOINTS SECTION------------------------------
//

const dataList: any = [];
async function threadGetCharacter(characters: any) {
    for (const character of characters) {
        try {
            let result: AxiosResponse = await axios.get(`${character}`);
            dataList.push(result.data);
        } catch (e: any) {
            console.log(e.Message);
        }
        return dataList;
    }
}

let comments_query_data: any = []
async function _set_comments_count() {
    for (let i = 0; i < books_query_data.data.length; i++) {
        let result = comments_query_data.filter((comment: any) => {
            return comment.book_isbn === books_query_data.data[i].isbn;
        });
        books_query_data.data[i]['comments_count']=result.length
    }
    return books_query_data;
}

const connectDb = async (
    read: boolean,
    write: boolean,
    destination: string
) => {
    try {

        let dbconnection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "test",
            connectionLimit: 10,
            debug: false,
        });

        if (read) {
            dbconnection.getConnection(async function (err: any, connection: any) {
                console.log("Connected to the MySQL --- server.read_db");
                if (err) {
                    return console.error("error: " + err.message);
                }
                let sql = "SELECT * FROM comments ";
                connection.query(sql, function (err: any, result: any) {
                    if (err) throw err;
                    comments_query_data=result
                    return result
                });
                connection.release();
            });
        }
    } catch (error) {
        console.log(error);
    }
};

//
// helper methods -------------------------------


// Start api endpoints - API ENDPOINTS SECTION---------------------------
//

const getBooksList = async (req: Request, res: Response) => {
    // get books list
    let result: AxiosResponse = await axios.get(
        ` ${process.env.SERVICE_API_URL}/books`
    );
    let booksList = result.data;

    books_query_data = booksList
    connectDb(true, false, "all").then((r) => console.log(r));
    _set_comments_count()
    return res.status(200).json({
        status: true,
        message: "books listed ",
        data: books_query_data.data,
    });
};

const getBook = async (req: Request, res: Response) => {
    // set the book id
    let url = req.query.url;

    // get the Book items data
    let result: AxiosResponse = await axios.get(`${url}`);
    let book = result.data;

    return res.status(200).json({
        status: true,
        message: "books listed ",
        data: book,
    });
};

const getBookCharacters = async (req: Request, res: Response) => {
    let book_character_urls = req.body;
    let characters_list: any = [];
    characters_list = await threadGetCharacter(book_character_urls);
    return res.status(200).json({
        status: true,
        message: "Characters listed ",
        data: characters_list,
    });
};

//
// end api endpoints ----------------------------



export default {
    getBooksList,
    getBook,
    getBookCharacters,
};
