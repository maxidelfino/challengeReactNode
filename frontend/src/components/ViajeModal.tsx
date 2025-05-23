"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { XIcon } from "lucide-react"
import type { Viaje } from "../types"
import { combustibles } from "../utils/mockData"
import { viajeSchema } from "../validations/schemas"
import { validateWithJoi, validateField } from "../utils/validation"

interface ViajeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (viaje: Viaje) => void
  viaje: Viaje | null
}

const ViajeModal = ({ isOpen, onClose, onSave, viaje }: ViajeModalProps) => {
  const [formData, setFormData] = useState<Partial<Viaje>>({
    camion: "",
    conductor: "",
    origen: "",
    destino: "",
    combustible: "Diésel",
    cantidad_litros: 0,
    fecha_salida: new Date().toISOString().slice(0, 16),
    estado: "En tránsito",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (viaje) {
      const fechaSalida = new Date(viaje.fecha_salida)
      const formattedDate = fechaSalida.toISOString().slice(0, 16)

      setFormData({
        ...viaje,
        fecha_salida: formattedDate,
      })
    } else {
      setFormData({
        camion: "",
        conductor: "",
        origen: "",
        destino: "",
        combustible: "Diésel",
        cantidad_litros: 0,
        fecha_salida: new Date().toISOString().slice(0, 16),
        estado: "En tránsito",
      })
    }

    setErrors({})
    setTouchedFields({})
  }, [viaje, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const processedValue = name === "cantidad_litros" ? Number.parseInt(value) || 0 : value

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }))

    if (touchedFields[name]) {
      const fieldError = validateField(viajeSchema, name, processedValue)
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError || "",
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const processedValue = name === "cantidad_litros" ? Number.parseInt(value) || 0 : value

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }))

    const fieldError = validateField(viajeSchema, name, processedValue)
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError || "",
    }))
  }

  const validateForm = (): boolean => {
    const dataToValidate = {
      ...formData,
      fecha_salida: formData.fecha_salida ? new Date(formData.fecha_salida) : undefined,
    }

    const validation = validateWithJoi(viajeSchema, dataToValidate)
    setErrors(validation.errors)

    const allFields = Object.keys(formData)
    const newTouchedFields: Record<string, boolean> = {}
    allFields.forEach((field) => {
      newTouchedFields[field] = true
    })
    setTouchedFields(newTouchedFields)

    return validation.isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      if (viaje) {
        onSave({
          _id: viaje._id,
          camion: formData.camion!,
          conductor: formData.conductor!,
          origen: formData.origen!,
          destino: formData.destino!,
          combustible: formData.combustible!,
          cantidad_litros: formData.cantidad_litros!,
          fecha_salida: new Date(formData.fecha_salida!).toISOString(),
          estado: formData.estado!,
        })
      } else {
        onSave({
          _id: "",
          camion: formData.camion!,
          conductor: formData.conductor!,
          origen: formData.origen!,
          destino: formData.destino!,
          combustible: formData.combustible!,
          cantidad_litros: formData.cantidad_litros!,
          fecha_salida: new Date(formData.fecha_salida!).toISOString(),
          estado: "En tránsito",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{viaje ? "Editar Viaje" : "Registrar Nuevo Viaje"}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="camion" className="block text-sm font-medium text-gray-700">
                  Camión *
                </label>
                <input
                  type="text"
                  name="camion"
                  id="camion"
                  value={formData.camion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: CAM-001"
                  className={`mt-1 block w-full border ${
                    errors.camion && touchedFields.camion
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.camion && touchedFields.camion && <p className="mt-1 text-sm text-red-600">{errors.camion}</p>}
              </div>

              <div>
                <label htmlFor="conductor" className="block text-sm font-medium text-gray-700">
                  Conductor *
                </label>
                <input
                  type="text"
                  name="conductor"
                  id="conductor"
                  value={formData.conductor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Juan Pérez"
                  className={`mt-1 block w-full border ${
                    errors.conductor && touchedFields.conductor
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.conductor && touchedFields.conductor && (
                  <p className="mt-1 text-sm text-red-600">{errors.conductor}</p>
                )}
              </div>

              <div>
                <label htmlFor="origen" className="block text-sm font-medium text-gray-700">
                  Origen *
                </label>
                <input
                  type="text"
                  name="origen"
                  id="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Buenos Aires"
                  className={`mt-1 block w-full border ${
                    errors.origen && touchedFields.origen
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.origen && touchedFields.origen && <p className="mt-1 text-sm text-red-600">{errors.origen}</p>}
              </div>

              <div>
                <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
                  Destino *
                </label>
                <input
                  type="text"
                  name="destino"
                  id="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Córdoba"
                  className={`mt-1 block w-full border ${
                    errors.destino && touchedFields.destino
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.destino && touchedFields.destino && (
                  <p className="mt-1 text-sm text-red-600">{errors.destino}</p>
                )}
              </div>

              <div>
                <label htmlFor="combustible" className="block text-sm font-medium text-gray-700">
                  Combustible *
                </label>
                <select
                  name="combustible"
                  id="combustible"
                  value={formData.combustible}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border ${
                    errors.combustible && touchedFields.combustible
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                >
                  {combustibles.map((combustible) => (
                    <option key={combustible} value={combustible}>
                      {combustible}
                    </option>
                  ))}
                </select>
                {errors.combustible && touchedFields.combustible && (
                  <p className="mt-1 text-sm text-red-600">{errors.combustible}</p>
                )}
              </div>

              <div>
                <label htmlFor="cantidad_litros" className="block text-sm font-medium text-gray-700">
                  Cantidad de Litros *
                </label>
                <input
                  type="number"
                  name="cantidad_litros"
                  id="cantidad_litros"
                  min="1"
                  max="30000"
                  value={formData.cantidad_litros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: 15000"
                  className={`mt-1 block w-full border ${
                    errors.cantidad_litros && touchedFields.cantidad_litros
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.cantidad_litros && touchedFields.cantidad_litros && (
                  <p className="mt-1 text-sm text-red-600">{errors.cantidad_litros}</p>
                )}
              </div>

              <div>
                <label htmlFor="fecha_salida" className="block text-sm font-medium text-gray-700">
                  Fecha de Salida *
                </label>
                <input
                  type="datetime-local"
                  name="fecha_salida"
                  id="fecha_salida"
                  value={formData.fecha_salida}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border ${
                    errors.fecha_salida && touchedFields.fecha_salida
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 sm:text-sm`}
                />
                {errors.fecha_salida && touchedFields.fecha_salida && (
                  <p className="mt-1 text-sm text-red-600">{errors.fecha_salida}</p>
                )}
              </div>

              {viaje && (
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    name="estado"
                    id="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="En tránsito">En tránsito</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {viaje ? "Guardar Cambios" : "Registrar Viaje"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ViajeModal
