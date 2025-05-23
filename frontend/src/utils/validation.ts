import type Joi from "joi"

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateWithJoi = (schema: Joi.ObjectSchema, data: any): ValidationResult => {
  const { error } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  })

  if (!error) {
    return { isValid: true, errors: {} }
  }

  const errors: Record<string, string> = {}

  error.details.forEach((detail) => {
    const field = detail.path.join(".")
    errors[field] = detail.message
  })

  return { isValid: false, errors }
}

export const validateField = (schema: Joi.ObjectSchema, fieldName: string, value: any): string | null => {
  const fieldSchema = schema.extract(fieldName)
  const { error } = fieldSchema.validate(value)

  return error && error.details && error.details[0] ? error.details[0].message : null
}
