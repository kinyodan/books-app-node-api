import express from 'express';
// @ts-ignore
import Bookscontroller from '../controllers/books';
// @ts-ignore
import CharactersController from '../controllers/characters';
// @ts-ignore
import CommentsController from '../controllers/comments';

const router = express.Router();

// Books routes list
router.get('/books-list', Bookscontroller.getBooksList);
router.post('/book', Bookscontroller.getBook);
router.post('/get-book-characters', Bookscontroller.getBookCharacters);

// Characters routes list
router.post('/characters-list', CharactersController.getCharactersList);
router.post('/get-character', CharactersController.getCharacter);

// Comments routes list
router.get('/get-comments', CommentsController.getComments);
router.post('/add-comment', CommentsController.createComment);
router.post('/update-comment', CommentsController.updateComment);
router.post('/delete-comment', CommentsController.deleteComment);

export = router;