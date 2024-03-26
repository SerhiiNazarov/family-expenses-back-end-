const { User } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

const addNote = async (req, res, next) => {
  const { profit, exes } = req.body;

  const changeGeneralValue = profit ? profit : -exes;

  const dateStamp = new Date("2024-03-01");

  const result = await User.findOneAndUpdate(
    { user: "Melania" },
    {
      $push: { data: { ...req.body, dateStamp } },
      $inc: { general: changeGeneralValue },
    },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  addNote: ctrlWrapper(addNote),
};
