import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

const getCharactersList = async (req: Request, res: Response) => {
  let requestData: any = JSON.parse(Object.keys(req.body)[0]);
  let req_data = {
    isbn: requestData.isbn,
    sortBy: requestData.sortBy,
    filters: requestData.filters,
  };

  let result: AxiosResponse = await axios.post(
    `${process.env.SERVICE_API_URL}/batch_get_characters_details`,
    req_data
  );
  result.data["meta"] = [];
  let characterList = result.data;

  return res.status(200).json({
    status: true,
    message: "Characters listed",
    characterList,
  });
};

const getCharacter = async (req: Request, res: Response) => {
  let requestData: any = JSON.parse(Object.keys(req.body)[0]);
  let result: AxiosResponse = await axios.get(`${requestData.characterUrl}`);

  let character = result.data;
  return res.status(200).json({
    status: true,
    message: "Character data listed",
    data: character,
  });
};

export default {
  getCharactersList,
  getCharacter,
};
