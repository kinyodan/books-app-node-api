"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let query_data = [];
let query_data_write = [];
const connectDb = (data, read, write, destination) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
        dbconnection.getConnection(function (err, connection) {
          return __awaiter(this, void 0, void 0, function* () {
            console.log("Connected to the MySQL --- server.read_db");
            if (err) {
              return console.error("error: " + err.message);
            }
            let param_data = data;
            let sql =
              "SELECT * FROM comments WHERE book_isbn=" +
              `'${param_data.isbn}'` +
              " ORDER BY created_at DESC";
            connection.query(sql, function (err, result) {
              if (err) throw err;
              console.log(sql);
              query_data = result;
              return result;
            });
            connection.release();
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
const connectDbWrite = (data, read, write, destination) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      let connectionWrite = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "test",
        connectionLimit: 10,
        debug: false,
      });
      if (write) {
        connectionWrite.getConnection(function (err, connection) {
          console.log("Connected to the MySQL --- server.write");
          if (err) {
            return console.error("error: " + err.message);
          }
          let param_data = JSON.parse(data);
          let sql_write =
            "INSERT INTO comments (comment, commenter_ip_adress, book_isbn) VALUES (" +
            `'${param_data.comment}'` +
            "," +
            `'${param_data.ip_address}'` +
            "," +
            `'${param_data.isbn}'` +
            ")";
          connection.query(sql_write, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            query_data_write = result;
          });
          connection.release();
        });
        connectionWrite.getConnection(function (err, connection) {
          console.log("comments getConnection for write ");
          if (err) {
            return console.error("error: " + err.message);
          }
          let param_data = JSON.parse(data);
          let sql_read =
            "SELECT * FROM comments WHERE book_isbn=" +
            `'${param_data.isbn}'` +
            " ORDER BY created_at DESC";
          connection.query(sql_read, function (err, result) {
            if (err) throw err;
            console.log("comments list records retrieved ");
            query_data = result;
          });
          connection.release();
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
const createComment = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let requestData = Object.keys(req.body)[0];
    connectDbWrite(requestData, false, true, "comments").then((r) =>
      console.log(r)
    );
    return res.status(200).json({
      status: true,
      message: "Comment saved Successfully",
      data: query_data_write,
    });
  });
const updateComment = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    connectDbWrite(req.body, false, true, "comments").then((r) =>
      console.log(r)
    );
    return res.status(200).json({
      status: true,
      message: "Comments Updated Successfully",
    });
  });
const deleteComment = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    connectDbWrite(req.body, false, true, "comments").then((r) =>
      console.log(r)
    );
    return res.status(200).json({
      status: true,
      message: "Comment deleted Successfully",
    });
  });
const getComments = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    connectDb(req.query, true, false, "comments").then((r) => console.log(r));
    return res.status(200).json({
      status: true,
      message: "Comments Listed",
      data: query_data,
    });
  });
exports.default = {
  getComments,
  deleteComment,
  updateComment,
  createComment,
};
