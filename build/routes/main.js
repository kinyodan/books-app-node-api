"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const express_1 = __importDefault(require("express"));
// @ts-ignore
const books_1 = __importDefault(require("../controllers/books"));
// @ts-ignore
const characters_1 = __importDefault(require("../controllers/characters"));
// @ts-ignore
const comments_1 = __importDefault(require("../controllers/comments"));
const router = express_1.default.Router();
// Books routes list
router.get("/books-list", books_1.default.getBooksList);
router.post("/book", books_1.default.getBook);
router.post("/get-book-characters", books_1.default.getBookCharacters);
// Characters routes list
router.post("/characters-list", characters_1.default.getCharactersList);
router.post("/get-character", characters_1.default.getCharacter);
// Comments routes list
router.get("/get-comments", comments_1.default.getComments);
router.post("/add-comment", comments_1.default.createComment);
router.post("/update-comment", comments_1.default.updateComment);
router.post("/delete-comment", comments_1.default.deleteComment);
module.exports = router;
