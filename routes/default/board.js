const express = require("express");
const router = express.Router();
const {
  getAllBoards,
  selectBoardByTitle,
  selectBoardById,
} = require("../../database/default/board");

router.get("/getAllBoards", async (req, res) => {
  const { offset } = req.query;
  const data = await getAllBoards(offset);
  res.send({
    boardLists: data,
    status: 200,
  });
});

router.get("/selectBoardByTitle", async (req, res) => {
  const { offset, title } = req.query;
  const data = await selectBoardByTitle(title, offset);
  res.send({
    board: data,
    status: 200,
  });
});

router.get("/selectBoardById", async (req, res) => {
  const { id } = req.query;
  const data = await selectBoardById(id);
  res.send({
    board: data,
    status: 200,
  });
});

module.exports = router;
