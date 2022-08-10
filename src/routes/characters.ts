import express from 'express';
// @ts-ignore
import controller from '../controllers/characters';
const router = express.Router();

router.get('/characters-list', controller.getCharactersList);
router.get('/character/:id', controller.getCharacter);

export = router;