// src/validate/products.ts
import Joi from 'joi';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export const validateProduct = async (
    request: Request, 
    h: ResponseToolkit
  ) => {
  
    const schema = Joi.object({
      title: Joi.string().required(),
      
      description: Joi.string().allow(''),
      
      image: Joi.string().uri(),
      
      price: Joi.number().precision(2).positive(),
      
      categoryId: Joi.number().integer().min(1),
      
      shippingFee: Joi.number().precision(2).default(0),
      
      taxRate: Joi.number().precision(2).default(0.1), 
    });
     
    const {error} = schema.validate(request.payload);
     
    if (error) {
      return h.response(error).code(400);
    }
    
    return h.continue;
  
  };