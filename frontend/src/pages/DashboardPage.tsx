"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Sidebar from "../components/Sidebar"
import ViajeTable from "../components/ViajeTable"
import ViajeModal from "../components/ViajeModal"
import { fetchViajes, updateViaje, createViaje, cancelViaje } from "../utils/api"
import type { Viaje } from "../types"
import { PlusIcon, LogOutIcon } from "lucide-react"
import { useToast } from "../context/ToastContext"
import LoadingSpinner from "../components/LoadingSpinner"

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const [viajes, setViajes] = useState<Viaje[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null)
  const [filters, setFilters] = useState({
    conductor: "",
    combustible: "",
    estado: "",
  })

  const { showToast } = useToast()

  useEffect(() => {
    const loadViajes = async () => {
      try {
        const data = await fetchViajes()
        setViajes(data)
      } catch (error) {
        console.error("Error fetching viajes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadViajes()

    const interval = setInterval(loadViajes, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleAddViaje = () => {
    setSelectedViaje(null)
    setIsModalOpen(true)
  }

  const handleEditViaje = (viaje: Viaje) => {
    setSelectedViaje(viaje)
    setIsModalOpen(true)
  }

  const handleSaveViaje = async (viaje: Viaje) => {
    try {
      if (selectedViaje) {
        const updatedViaje = await updateViaje(viaje)
        setViajes(viajes.map((v) => (v.id === updatedViaje.id ? updatedViaje : v)))
        showToast("Viaje actualizado correctamente", "success")
      } else {
        const newViaje = await createViaje(viaje)
        setViajes([...viajes, newViaje])
        showToast("Viaje creado correctamente", "success")
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error saving viaje:", error)
      showToast("Error al guardar el viaje", "error")
    }
  }

  const handleCancelViaje = async (id: string) => {
    try {
      const canceledViaje = await cancelViaje(id)
      setViajes(viajes.map((v) => (v.id === id ? canceledViaje : v)))
      showToast("Viaje cancelado correctamente", "success")
    } catch (error) {
      console.error("Error canceling viaje:", error)
      showToast("Error al cancelar el viaje", "error")
    }
  }

  const filteredViajes = viajes.filter((viaje) => {
    return (
      (filters.conductor === "" || viaje.conductor.toLowerCase().includes(filters.conductor.toLowerCase())) &&
      (filters.combustible === "" || viaje.combustible === filters.combustible) &&
      (filters.estado === "" || viaje.estado === filters.estado)
    )
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar filters={filters} setFilters={setFilters} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard de Despachos</h1>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user?.email}</span>
                <span className="ml-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{user?.role}</span>
              </div>

              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOutIcon className="h-4 w-4 mr-1" />
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">Viajes Registrados</h2>

              <button
                onClick={handleAddViaje}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Agregar Viaje
              </button>
            </div>

            {isLoading ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
                <LoadingSpinner />
              </div>
            ) : (
              <ViajeTable
                viajes={filteredViajes}
                isLoading={isLoading}
                onEdit={handleEditViaje}
                onCancel={handleCancelViaje}
              />
            )}
          </div>
        </main>
      </div>

      <ViajeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveViaje}
        viaje={selectedViaje}
      />
    </div>
  )
}

export default DashboardPage
