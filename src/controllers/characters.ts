import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

const getCharactersList = async (req: Request, res: Response) => {
    let requestKeys = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let req_data: any = {}

    requestKeys.forEach(function (value, index) {
        req_data[value] = requestDatavalues[index]
    });

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

const getAllCharactersList = async (req: Request, res: Response) => {
    let requestKeys = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let req_data: any = {}

    requestKeys.forEach(function (value, index) {
        req_data[value] = requestDatavalues[index]
    });

    let result: AxiosResponse = await axios.post(
        `${process.env.SERVICE_API_URL}/get_all_characters`,
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
    let requestKeys = Object.keys(req.body)
    let requestDatavalues = Object.values(req.body)
    let req_data: any = {}

    requestKeys.forEach(function (value, index) {
        req_data[value] = requestDatavalues[index]
    });

    let result: AxiosResponse = await axios.get(`${req_data.characterUrl}`);
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
    getAllCharactersList
};
