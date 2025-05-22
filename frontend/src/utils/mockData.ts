import type { Viaje } from "../types"

// Mock data for viajes
export const mockViajes: Viaje[] = [
  {
    id: "1",
    camion: "CAM-001",
    conductor: "Juan Pérez",
    origen: "Buenos Aires",
    destino: "Córdoba",
    combustible: "Diésel",
    cantidad_litros: 15000,
    fecha_salida: "2025-06-15T08:00:00.000Z",
    estado: "En tránsito",
  },
  {
    id: "2",
    camion: "CAM-002",
    conductor: "María López",
    origen: "Rosario",
    destino: "Mendoza",
    combustible: "Nafta",
    cantidad_litros: 22000,
    fecha_salida: "2025-06-16T10:30:00.000Z",
    estado: "Finalizado",
  },
  {
    id: "3",
    camion: "CAM-003",
    conductor: "Carlos Rodríguez",
    origen: "Córdoba",
    destino: "Tucumán",
    combustible: "GNC",
    cantidad_litros: 18000,
    fecha_salida: "2025-06-14T09:15:00.000Z",
    estado: "Cancelado",
  },
  {
    id: "4",
    camion: "CAM-004",
    conductor: "Ana Martínez",
    origen: "Mendoza",
    destino: "Buenos Aires",
    combustible: "Diésel",
    cantidad_litros: 25000,
    fecha_salida: "2025-06-18T07:45:00.000Z",
    estado: "En tránsito",
  },
  {
    id: "5",
    camion: "CAM-005",
    conductor: "Roberto Gómez",
    origen: "La Plata",
    destino: "Mar del Plata",
    combustible: "Nafta",
    cantidad_litros: 12000,
    fecha_salida: "2025-06-17T11:00:00.000Z",
    estado: "En tránsito",
  },
  {
    id: "6",
    camion: "CAM-006",
    conductor: "Laura Sánchez",
    origen: "Salta",
    destino: "Jujuy",
    combustible: "Diésel",
    cantidad_litros: 8000,
    fecha_salida: "2025-06-19T08:30:00.000Z",
    estado: "Finalizado",
  },
  {
    id: "7",
    camion: "CAM-007",
    conductor: "Diego Fernández",
    origen: "Neuquén",
    destino: "Bariloche",
    combustible: "GNC",
    cantidad_litros: 16000,
    fecha_salida: "2025-06-20T09:00:00.000Z",
    estado: "En tránsito",
  },
]

// Available combustibles
export const combustibles = ["Diésel", "Nafta", "GNC"]

// Available estados
export const estados = ["En tránsito", "Finalizado", "Cancelado"]
