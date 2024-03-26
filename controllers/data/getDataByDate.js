const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getDataByDate = async (req, res, next) => {
  const { start_date, end_date } = req.body;

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const result = await User.find();

  const filteredData = result.data.filter((item) => {
    const dateStamp = new Date(item.dateStamp);
    return dateStamp >= startDate && dateStamp <= endDate;
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    general: result.general,
    data: filteredData,
  });
};

module.exports = {
  getDataByDate: ctrlWrapper(getDataByDate),
};
