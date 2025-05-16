const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { validateBoard } = require('../middleware/validate');

const prisma = new PrismaClient();

// GET all boards
router.get('/', async (req, res, next) => {
  try {
    console.log('Incoming data:', req.body);
    const boards = await prisma.board.findMany({ include: { cards: true } });
    res.json(boards);
  } catch (err) {
    next(err);
  }
});

// GET single board
router.get('/:id', async (req, res, next) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(req.params.id) },
      include: { cards: true }
    });
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    next(err);
  }
});

// CREATE board
router.post('/', validateBoard, async (req, res, next) => {
  try {
    const { title, category, author } = req.body;
    const board = await prisma.board.create({ data: { title, category, author } });
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
});

// UPDATE board
router.put('/:id', validateBoard, async (req, res, next) => {
  try {
    const { title, category, author } = req.body;
    const updated = await prisma.board.update({
      where: { id: Number(req.params.id) },
      data: { title, category, author }
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE board
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.card.deleteMany({ where: { boardId: Number(req.params.id) } }); // cleanup cards
    await prisma.board.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;