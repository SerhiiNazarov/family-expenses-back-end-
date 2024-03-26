const { User } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

const getGeneralValue = async (req, res, next) => {
  const data = await User.find();

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data[0].general);
};

module.exports = {
  getGeneralValue: ctrlWrapper(getGeneralValue),
};
