"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronUpIcon, ChevronDownIcon, EditIcon, XCircleIcon, EyeIcon } from "lucide-react"
import StatusBadge from "./StatusBadge"
import Tooltip from "./Tooltip"
import type { Viaje } from "../types"

interface ViajeTableProps {
  viajes: Viaje[]
  isLoading: boolean
  onEdit: (viaje: Viaje) => void
  onCancel: (id: string) => void
}

const ViajeTable = ({ viajes, isLoading, onEdit, onCancel }: ViajeTableProps) => {
  const [sortField, setSortField] = useState<keyof Viaje>("fecha_salida")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [truncatedCells, setTruncatedCells] = useState<Record<string, boolean>>({})

  const navigate = useNavigate()

  const checkTruncation = (element: HTMLDivElement, key: string) => {
    if (element) {
      const isTruncated = element.scrollWidth > element.clientWidth
      setTruncatedCells(prev => ({
        ...prev,
        [key]: isTruncated
      }))
    }
  }

  const handleSort = (field: keyof Viaje) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedViajes = [...viajes].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const SortIcon = ({ field }: { field: keyof Viaje }) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? (
      <ChevronUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 ml-1" />
    )
  }

  const TruncatedCell = ({ content, maxWidth }: { content: string; maxWidth: string }) => {
    const cellRef = useRef<HTMLDivElement>(null)
    const cellKey = `${content}-${maxWidth}`

    useEffect(() => {
      if (cellRef.current) {
        checkTruncation(cellRef.current, cellKey)
      }
    }, [content])

    return truncatedCells[cellKey] ? (
      <Tooltip content={content}>
        <div ref={cellRef} className={`truncate ${maxWidth}`}>
          {content}
        </div>
      </Tooltip>
    ) : (
      <div ref={cellRef} className={`truncate ${maxWidth}`}>
        {content}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-9 bg-gray-200 rounded"></div>
          <div className="h-9 bg-gray-200 rounded"></div>
          <div className="h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (viajes.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
        <p className="text-gray-500">No hay viajes registrados o que coincidan con los filtros.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("camion")}
                >
                  <div className="flex items-center">
                    Camión
                    <SortIcon field="camion" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("conductor")}
                >
                  <div className="flex items-center">
                    Conductor
                    <SortIcon field="conductor" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("origen")}
                >
                  <div className="flex items-center">
                    Origen
                    <SortIcon field="origen" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("destino")}
                >
                  <div className="flex items-center">
                    Destino
                    <SortIcon field="destino" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("combustible")}
                >
                  <div className="flex items-center">
                    Combustible
                    <SortIcon field="combustible" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("cantidad_litros")}
                >
                  <div className="flex items-center">
                    Litros
                    <SortIcon field="cantidad_litros" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("fecha_salida")}
                >
                  <div className="flex items-center">
                    Fecha Salida
                    <SortIcon field="fecha_salida" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("estado")}
                >
                  <div className="flex items-center">
                    Estado
                    <SortIcon field="estado" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedViajes.map((viaje, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    <TruncatedCell content={viaje.camion} maxWidth="max-w-[80px]" />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <TruncatedCell content={viaje.conductor} maxWidth="max-w-[120px]" />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <TruncatedCell content={viaje.origen} maxWidth="max-w-[100px]" />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <TruncatedCell content={viaje.destino} maxWidth="max-w-[100px]" />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <TruncatedCell content={viaje.combustible} maxWidth="max-w-[80px]" />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {viaje.cantidad_litros?.toLocaleString()} L
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(viaje.fecha_salida).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <StatusBadge estado={viaje.estado} />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/viaje/${viaje._id}`)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                        <span className="sr-only">Ver detalle</span>
                      </button>

                      <button
                        onClick={() => onEdit(viaje)}
                        disabled={viaje.estado === "Cancelado"}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <EditIcon className="h-5 w-5" />
                        <span className="sr-only">Editar</span>
                      </button>

                      <button
                        onClick={() => onCancel(viaje._id)}
                        disabled={viaje.estado === "Cancelado"}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircleIcon className="h-5 w-5" />
                        <span className="sr-only">Cancelar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViajeTable