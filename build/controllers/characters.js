"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getCharactersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requestData = JSON.parse(Object.keys(req.body)[0]);
    let req_data = { isbn: requestData.isbn, sortBy: requestData.sortBy, filters: requestData.filters };
    let result = yield axios_1.default.post(`${process.env.SERVICE_API_URL}/batch_get_characters_details`, req_data);
    result.data["meta"] = [];
    let characterList = result.data;
    return res.status(200).json({
        status: true,
        message: "Characters listed",
        characterList,
    });
});
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let requestData = JSON.parse(Object.keys(req.body)[0]);
    let result = yield axios_1.default.get(`${requestData.characterUrl}`);
    let character = result.data;
    return res.status(200).json({
        status: true,
        message: "Character data listed",
        data: character
    });
});
exports.default = {
    getCharactersList,
    getCharacter
};
