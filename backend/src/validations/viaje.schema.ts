import Joi from 'joi';

export const viajeSchema = Joi.object({
  origen: Joi.string().required().messages({
    'any.required': 'El campo origen es obligatorio',
    'string.base': 'El campo origen debe ser un texto',
  }),
  destino: Joi.string().required().messages({
    'any.required': 'El campo destino es obligatorio',
    'string.base': 'El campo destino debe ser un texto',
  }),
  cantidad_litros: Joi.number().max(30000).required().messages({
    'any.required': 'La cantidad de litros es obligatoria',
    'number.base': 'La cantidad de litros debe ser un número',
    'number.max': 'No se pueden registrar más de 30.000 litros',
  }),
  fecha_salida: Joi.date().greater('now').required().messages({
    'any.required': 'La fecha de salida es obligatoria',
    'date.base': 'La fecha debe tener un formato válido',
    'date.greater': 'La fecha de salida no puede ser en el pasado',
  }),
  conductor: Joi.string().required().messages({
    'any.required': 'El conductor es obligatorio',
  }),
  camion: Joi.string().required().messages({
    'any.required': 'El camión es obligatorio',
  }),
  combustible: Joi.string().required().messages({
    'any.required': 'El tipo de combustible es obligatorio',
  }),
});
