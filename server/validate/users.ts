import Joi from 'joi';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
  repeat_password: Joi.ref('password'),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

export const validateUser = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject | symbol> => {
  const { error } = userSchema.validate(request.payload);

  if (error) {
    return h
      .response({
        errors: error.details.map((d) => d.message),
      })
      .code(400)
      .takeover();
  }

  return h.continue;
};
