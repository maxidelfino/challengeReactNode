"use client"

import { useState, useEffect } from "react"
import { fetchViajesStats } from "../utils/api"
import type { ViajeStats } from "../types"
import { TruckIcon, DropletIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react"
import LoadingSpinner from "./LoadingSpinner"

interface DashboardStatsProps {
  refreshTrigger: number
}

const DashboardStats = ({ refreshTrigger }: DashboardStatsProps) => {
  const [stats, setStats] = useState<ViajeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true)
        const data = await fetchViajesStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [refreshTrigger])

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de Viajes</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de Viajes</h2>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4">
          <p className="text-gray-500 text-center">No se pudieron cargar las estadísticas</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de Viajes</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Viajes</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.total}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">En Tránsito</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.enTransito}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Finalizados</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.finalizados}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Cancelados</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{stats.cancelados}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Litros Transportados</h3>
            <div className="flex items-center">
              <DropletIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalLitros.toLocaleString()} L</p>
                <p className="text-sm text-gray-500">Total acumulado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Viajes por Combustible</h3>
            <div className="space-y-4">
              {Object.entries(stats.combustibles).map(([combustible, cantidad]) => (
                <div key={combustible} className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{combustible}</span>
                      <span className="text-sm font-medium text-gray-700">{cantidad}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          combustible === "Diésel"
                            ? "bg-yellow-500"
                            : combustible === "Nafta"
                              ? "bg-red-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${(cantidad / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
