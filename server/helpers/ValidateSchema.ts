import Joi from "joi";

const userSchema: any = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).trim(true).required(),
  //    tasks: Joi.array().items(Joi.string().alphanum().trim(true)),
});

export const validateSchema = (payload: any) => {
  const { error } = userSchema.validate(payload);
  if (error) return false;

  return true;
};
