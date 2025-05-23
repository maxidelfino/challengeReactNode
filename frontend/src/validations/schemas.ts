import Joi from "joi"

export const viajeSchema = Joi.object({
  camion: Joi.string()
    .required()
    .min(3)
    .max(20)
    .pattern(/^[A-Z0-9-]+$/)
    .messages({
      "any.required": "El camión es obligatorio",
      "string.empty": "El camión no puede estar vacío",
      "string.min": "El camión debe tener al menos 3 caracteres",
      "string.max": "El camión no puede tener más de 20 caracteres",
      "string.pattern.base": "El camión debe contener solo letras mayúsculas, números y guiones",
    }),

  conductor: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
      "any.required": "El conductor es obligatorio",
      "string.empty": "El conductor no puede estar vacío",
      "string.min": "El conductor debe tener al menos 2 caracteres",
      "string.max": "El conductor no puede tener más de 50 caracteres",
      "string.pattern.base": "El conductor solo puede contener letras y espacios",
    }),

  origen: Joi.string().required().min(2).max(50).messages({
    "any.required": "El origen es obligatorio",
    "string.empty": "El origen no puede estar vacío",
    "string.min": "El origen debe tener al menos 2 caracteres",
    "string.max": "El origen no puede tener más de 50 caracteres",
  }),

  destino: Joi.string().required().min(2).max(50).invalid(Joi.ref("origen")).messages({
    "any.required": "El destino es obligatorio",
    "string.empty": "El destino no puede estar vacío",
    "string.min": "El destino debe tener al menos 2 caracteres",
    "string.max": "El destino no puede tener más de 50 caracteres",
    "any.invalid": "El destino debe ser diferente al origen",
  }),

  combustible: Joi.string().required().valid("Diésel", "Nafta", "GNC").messages({
    "any.required": "El tipo de combustible es obligatorio",
    "any.only": "El combustible debe ser Diésel, Nafta o GNC",
  }),

  cantidad_litros: Joi.number().required().integer().min(1).max(30000).messages({
    "any.required": "La cantidad de litros es obligatoria",
    "number.base": "La cantidad debe ser un número válido",
    "number.integer": "La cantidad debe ser un número entero",
    "number.min": "La cantidad mínima es de 1 litro",
    "number.max": "La cantidad máxima es de 30,000 litros",
  }),

  fecha_salida: Joi.date().required().min("now").messages({
    "any.required": "La fecha de salida es obligatoria",
    "date.base": "La fecha debe tener un formato válido",
    "date.min": "La fecha de salida no puede ser anterior a la fecha actual",
  }),

  estado: Joi.string().valid("En tránsito", "Finalizado", "Cancelado").optional().messages({
    "any.only": "El estado debe ser: En tránsito, Finalizado o Cancelado",
  }),
})

export const registerSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "any.required": "El correo electrónico es obligatorio",
      "string.empty": "El correo electrónico no puede estar vacío",
      "string.email": "Ingrese un correo electrónico válido",
    }),

  password: Joi.string()
    .required()
    .min(6)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      "any.required": "La contraseña es obligatoria",
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos 6 caracteres",
      "string.max": "La contraseña no puede tener más de 50 caracteres",
      "string.pattern.base": "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
    }),

  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirme su contraseña",
    "any.only": "Las contraseñas no coinciden",
  }),

  role: Joi.string().required().valid("user", "admin").messages({
    "any.required": "El rol es obligatorio",
    "any.only": "El rol debe ser usuario o administrador",
  }),
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "any.required": "El correo electrónico es obligatorio",
      "string.empty": "El correo electrónico no puede estar vacío",
      "string.email": "Ingrese un correo electrónico válido",
    }),

  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria",
    "string.empty": "La contraseña no puede estar vacía",
  }),
})
