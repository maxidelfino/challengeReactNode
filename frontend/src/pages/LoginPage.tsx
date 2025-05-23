"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { TruckIcon } from "lucide-react"
import { useToast } from "../context/ToastContext"
import { loginSchema } from "../validations/schemas"
import { validateWithJoi, validateField } from "../utils/validation"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (touchedFields[name]) {
      const fieldError = validateField(loginSchema, name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError || "",
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }))

    const fieldError = validateField(loginSchema, name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError || "",
    }))
  }

  const validateForm = (): boolean => {
    const validation = validateWithJoi(loginSchema, formData)
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
      await login(formData.email, formData.password)
      navigate("/")
    } catch (err) {
      showToast("Credenciales inválidas. Por favor intente nuevamente.", "error")
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Dashboard de Camiones Cisterna</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Ingrese sus credenciales para acceder</p>
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
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ingrese su contraseña"
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
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                ¿No tienes cuenta? Regístrate
              </Link>
            </div>
            <div className="text-sm">
              <p className="text-gray-600">Demo: admin@example.com / 123456</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
