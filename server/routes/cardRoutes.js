const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { validateCard } = require('../middleware/validate');

const prisma = new PrismaClient();

// GET all cards
router.get('/', async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

// GET cards for a board
router.get('/board/:boardId', async (req, res, next) => {
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: Number(req.params.boardId) }
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

// CREATE card for board
router.post('/board/:boardId', validateCard, async (req, res, next) => {
  try {
    const { message, gifUrl, author } = req.body;
    const card = await prisma.card.create({
      data: {
        message,
        gifUrl,
        author,
        boardId: Number(req.params.boardId),
        upvotes: 0
      }
    });
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
});

// UPDATE card
router.put('/:id', validateCard, async (req, res, next) => {
  try {
    const { message, gifUrl, author, upvotes } = req.body;
    const card = await prisma.card.update({
      where: { id: Number(req.params.id) },
      data: { message, gifUrl, author, upvotes }
    });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

// DELETE card
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.card.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;