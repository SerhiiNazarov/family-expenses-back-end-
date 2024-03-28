const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getDataByDate = async (req, res, next) => {
  const { start_date, end_date } = req.body;

  const endDate = end_date ? new Date(end_date) : new Date();
  const startDate = start_date
    ? new Date(start_date)
    : new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  const result = await User.find();

  console.log(result);

  const filteredData = result[0].data.filter((item) => {
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
