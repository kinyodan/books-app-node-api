import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

// Start api endpoints ----------------------------
//

const getBooksList = async (req: Request, res: Response) => {
  // get books list
  let result: AxiosResponse = await axios.get(
    `https://anapioficeandfire.com/api/books`
  );
  let booksList = result.data;
  return res.status(200).json({
    status: true,
    message: "books listed ",
    data: booksList,
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

// helper methods -------------------------------
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

//
// helper methods -------------------------------

export default {
  getBooksList,
  getBook,
  getBookCharacters,
};
