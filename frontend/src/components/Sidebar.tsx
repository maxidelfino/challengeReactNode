"use client"

import type React from "react"

import { useState } from "react"
import { TruckIcon, FilterIcon, XIcon } from "lucide-react"
import { combustibles, estados } from "../utils/mockData"

interface SidebarProps {
  filters: {
    conductor: string
    combustible: string
    estado: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      conductor: string
      combustible: string
      estado: string
    }>
  >
}

const Sidebar = ({ filters, setFilters }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      conductor: "",
      combustible: "",
      estado: "",
    })
  }

  const sidebarContent = (
    <>
      <div className="flex items-center px-4 py-5">
        <TruckIcon className="h-8 w-8 text-blue-600" />
        <h2 className="ml-3 text-xl font-semibold text-gray-900">Cisterna App</h2>
      </div>

      <div className="px-4 mt-4">
        <h3 className="flex items-center text-sm font-medium text-gray-500">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filtros
          {(filters.conductor || filters.combustible || filters.estado) && (
            <button onClick={clearFilters} className="ml-auto text-xs text-blue-600 hover:text-blue-800">
              Limpiar
            </button>
          )}
        </h3>

        <div className="mt-4 space-y-6">
          <div>
            <label htmlFor="conductor" className="block text-sm font-medium text-gray-700">
              Conductor
            </label>
            <input
              type="text"
              id="conductor"
              value={filters.conductor}
              onChange={(e) => handleFilterChange("conductor", e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar conductor..."
            />
          </div>

          <div>
            <label htmlFor="combustible" className="block text-sm font-medium text-gray-700">
              Combustible
            </label>
            <select
              id="combustible"
              value={filters.combustible}
              onChange={(e) => handleFilterChange("combustible", e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Todos</option>
              {combustibles.map((combustible) => (
                <option key={combustible} value={combustible}>
                  {combustible}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              value={filters.estado}
              onChange={(e) => handleFilterChange("estado", e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Todos</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed z-20 bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        >
          <FilterIcon className="h-6 w-6" />
        </button>

        {isMobileOpen && (
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileOpen(false)} />

            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <XIcon className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">{sidebarContent}</div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">{sidebarContent}</div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
