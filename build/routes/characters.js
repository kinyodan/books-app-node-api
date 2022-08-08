"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
// @ts-ignore
const characters_1 = __importDefault(require("../controllers/characters"));
const router = express_1.default.Router();
router.get("/characters-list", characters_1.default.getCharactersList);
router.get("/character/:id", characters_1.default.getCharacter);
module.exports = router;
