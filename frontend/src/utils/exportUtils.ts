import * as XLSX from "xlsx"
import type { Viaje } from "../types"

export const exportToExcel = (viajes: Viaje[], fileName: string) => {
  const formattedData = viajes.map((viaje) => ({
    ID: viaje._id,
    Camión: viaje.camion,
    Conductor: viaje.conductor,
    Origen: viaje.origen,
    Destino: viaje.destino,
    Combustible: viaje.combustible,
    "Cantidad (Litros)": viaje.cantidad_litros,
    "Fecha de Salida": new Date(viaje.fecha_salida).toLocaleString("es-ES"),
    Estado: viaje.estado,
  }))

  const worksheet = XLSX.utils.json_to_sheet(formattedData)

  const columnWidths = [
    { wch: 24 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 12 },
    { wch: 15 },
    { wch: 20 },
    { wch: 12 },
  ]
  worksheet["!cols"] = columnWidths

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Viajes")

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split("T")[0]}.xlsx`)
}
