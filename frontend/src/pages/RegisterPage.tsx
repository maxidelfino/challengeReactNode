"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { TruckIcon } from "lucide-react"
import { useToast } from "../context/ToastContext"
import { registerUser } from "../utils/api"
import { registerSchema } from "../validations/schemas"
import { validateWithJoi, validateField } from "../utils/validation"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (touchedFields[name]) {
      const fieldError = validateField(registerSchema, name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError || "",
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }))

    const fieldError = validateField(registerSchema, name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError || "",
    }))
  }

  const validateForm = (): boolean => {
    const validation = validateWithJoi(registerSchema, formData)
    setErrors(validation.errors)

    const allFields = Object.keys(formData)
    const newTouchedFields: Record<string, boolean> = {}
    allFields.forEach((field) => {
      newTouchedFields[field] = true
    })
    setTouchedFields(newTouchedFields)

    return validation.isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await registerUser(formData.email, formData.password, formData.role)

      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))

      showToast("Usuario registrado correctamente", "success")
      navigate("/")
    } catch (err: any) {
      console.error("Error al registrar:", err)
      showToast(err.message || "Error al registrar usuario. El correo podría estar en uso.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <TruckIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear nueva cuenta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Iniciar sesión
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ejemplo@correo.com"
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.email && touchedFields.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm`}
              />
              {errors.email && touchedFields.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mínimo 6 caracteres"
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.password && touchedFields.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm`}
              />
              {errors.password && touchedFields.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Repita su contraseña"
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.confirmPassword && touchedFields.confirmPassword
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm`}
              />
              {errors.confirmPassword && touchedFields.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rol *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-3 border ${
                  errors.role && touchedFields.role
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm`}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              {errors.role && touchedFields.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
