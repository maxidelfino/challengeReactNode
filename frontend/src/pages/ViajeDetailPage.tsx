"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchViajeById } from "../utils/api"
import type { Viaje } from "../types"
import { ArrowLeftIcon, TruckIcon, MapPinIcon, CalendarIcon, DropletIcon, UserIcon } from "lucide-react"
import StatusBadge from "../components/StatusBadge"
import LoadingSpinner from "../components/LoadingSpinner"
import RouteMap from "../components/RouteMap"
import { useToast } from "../context/ToastContext"

const ViajeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [viaje, setViaje] = useState<Viaje | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    const loadViaje = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const data = await fetchViajeById(id)
        setViaje(data)
      } catch (error) {
        console.error("Error fetching viaje:", error)
        showToast("Error al cargar el detalle del viaje", "error")
        navigate("/")
      } finally {
        setIsLoading(false)
      }
    }

    loadViaje()
  }, [id, navigate, showToast])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!viaje) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Viaje no encontrado</h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Volver al Dashboard
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button onClick={() => navigate("/")} className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Detalle del Viaje</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Información completa del viaje seleccionado</p>
            </div>
            <StatusBadge estado={viaje.estado} />
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <TruckIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Información del Vehículo</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Camión</p>
                    <p className="mt-1 text-lg text-gray-900">{viaje.camion}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Conductor</p>
                    <div className="flex items-center mt-1">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <p className="text-lg text-gray-900">{viaje.conductor}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Combustible</p>
                    <div className="flex items-center mt-1">
                      <DropletIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <p className="text-lg text-gray-900">{viaje.combustible}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Ruta</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Origen</p>
                    <p className="mt-1 text-lg text-gray-900">{viaje.origen}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Destino</p>
                    <p className="mt-1 text-lg text-gray-900">{viaje.destino}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha de Salida</p>
                    <div className="flex items-center mt-1">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                      <p className="text-lg text-gray-900">{formatDate(viaje.fecha_salida)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <DropletIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Carga</h3>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cantidad de Litros</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{viaje.cantidad_litros.toLocaleString()} L</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (viaje.cantidad_litros / 30000) * 100)}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {Math.round((viaje.cantidad_litros / 30000) * 100)}% de capacidad máxima
                </p>
              </div>
            </div>

            <div className="mt-4">
              <RouteMap origen={viaje.origen} destino={viaje.destino} />
            </div>

            {viaje.estado === "Cancelado" && (
              <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">Este viaje ha sido cancelado y no puede ser modificado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViajeDetailPage
