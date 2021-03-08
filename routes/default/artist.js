const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  selectArtistByName,
  selectArtistByType,
} = require("../../database/default/artist");

router.get("/getAllArtists", async (req, res) => {
  const { offset } = req.query;
  const data = await getAllArtist(offset);
  res.send({
    data,
  });
});

router.get("/selectArtistByName", async (req, res) => {
  const { offset, name } = req.query;
  const data = await selectArtistByName(offset, name);
  res.send({
    artists: data,
    status: 200,
  });
});

router.get("/selectArtistByType", async (req, res) => {
  const { offset, type } = req.query;
  const data = await selectArtistByType(type, offset);
  res.send({
    artists: data,
    status: 200,
  });
});
module.exports = router;
