import Joi from "joi";

const userSchema: any = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).trim(true).required(),
  tasks: Joi.array(),
  salary: Joi.number().required(),
  role: Joi.string().trim(true).required(),
  //  items(Joi.string().alphanum().trim(true))
});

export const validateSchema = (payload: any) => {
  const { error } = userSchema.validate(payload);
  if (error) return false;

  return true;
};
