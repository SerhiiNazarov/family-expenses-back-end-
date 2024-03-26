const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "Set name"],
    },
    data: {
      type: [
        {
          profit: Number,
          exes: Number,
          select: String,
          dateStamp: Date,
        },
      ],
    },
    general: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  profit: Joi.number(),
  exes: Joi.number(),
  select: Joi.string(),
  general: Joi.number(),
  dateStamp: Joi.date(),
});

const schemas = {
  addSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
