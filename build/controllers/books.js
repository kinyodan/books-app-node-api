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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Start api endpoints ----------------------------
//
const getBooksList = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // get books list
    let result = yield axios_1.default.get(
      `https://anapioficeandfire.com/api/books`
    );
    let booksList = result.data;
    return res.status(200).json({
      status: true,
      message: "books listed ",
      data: booksList,
    });
  });
const getBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // set the book id
    let url = req.query.url;
    // get the Book items data
    let result = yield axios_1.default.get(`${url}`);
    let book = result.data;
    return res.status(200).json({
      status: true,
      message: "books listed ",
      data: book,
    });
  });
const getBookCharacters = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let book_character_urls = req.body;
    let characters_list = [];
    characters_list = yield threadGetCharacter(book_character_urls);
    return res.status(200).json({
      status: true,
      message: "Characters listed ",
      data: characters_list,
    });
  });
//
// end api endpoints ----------------------------
// helper methods -------------------------------
//
const dataList = [];
function threadGetCharacter(characters) {
  return __awaiter(this, void 0, void 0, function* () {
    for (const character of characters) {
      try {
        let result = yield axios_1.default.get(`${character}`);
        dataList.push(result.data);
      } catch (e) {
        console.log(e.Message);
      }
      return dataList;
    }
  });
}
//
// helper methods -------------------------------
exports.default = {
  getBooksList,
  getBook,
  getBookCharacters,
};
