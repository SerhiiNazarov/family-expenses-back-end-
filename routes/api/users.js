const express = require("express");

const {
  getGeneralValue,
  getDataByDate,
  addNote,

} = require("../../controllers/data");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.get("/", getGeneralValue);

router.get("/details", getDataByDate);

router.post("/", validateBody(schemas.addSchema), addNote);

module.exports = router;
