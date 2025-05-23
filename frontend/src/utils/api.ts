import type { Viaje, LoginResponse, CancelResponse } from "../types"
import type { ViajeStats } from "../types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api"

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Error en la solicitud")
  }
  return response.json()
}

const getToken = () => localStorage.getItem("token")

const createAuthHeaders = () => {
  const token = getToken()
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  return handleResponse(response)
}

export const registerUser = async (email: string, password: string, role: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  })

  return handleResponse(response)
}

export const fetchViajes = async (
  page = 1,
  limit = 10,
  filters: { conductor?: string; combustible?: string; estado?: string } = {},
): Promise<{ viajes: Viaje[]; total: number; pages: number }> => {
  let url = `${API_URL}/viajes?page=${page}&limit=${limit}`

  if (filters.conductor) {
    url += `&conductor=${encodeURIComponent(filters.conductor)}`
  }

  if (filters.combustible) {
    url += `&combustible=${encodeURIComponent(filters.combustible)}`
  }

  if (filters.estado) {
    url += `&estado=${encodeURIComponent(filters.estado)}`
  }

  const response = await fetch(url, {
    headers: createAuthHeaders(),
  })

  return handleResponse(response)
}

export const fetchViajesStats = async (): Promise<ViajeStats> => {
  const response = await fetch(`${API_URL}/viajes/stats`, {
    headers: createAuthHeaders(),
  })

  return handleResponse(response)
}

export const createViaje = async (viaje: Omit<Viaje, "id">): Promise<Viaje> => {
  const { id, estado, ...viajeData } = viaje as any

  const response = await fetch(`${API_URL}/viajes`, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify(viajeData),
  })

  return handleResponse(response)
}

export const updateViaje = async (viaje: Viaje): Promise<Viaje> => {
  if (!viaje._id) {
    throw new Error("ID de viaje no proporcionado")
  }

  const response = await fetch(`${API_URL}/viajes/${viaje._id}`, {
    method: "PUT",
    headers: createAuthHeaders(),
    body: JSON.stringify({
      camion: viaje.camion,
      conductor: viaje.conductor,
      origen: viaje.origen,
      destino: viaje.destino,
      combustible: viaje.combustible,
      cantidad_litros: viaje.cantidad_litros,
      fecha_salida: viaje.fecha_salida,
      estado: viaje.estado,
    }),
  })

  return handleResponse(response)
}

export const cancelViaje = async (id: string): Promise<Viaje> => {
  if (!id) {
    throw new Error("ID de viaje no proporcionado")
  }

  const response = await fetch(`${API_URL}/viajes/${id}`, {
    method: "DELETE",
    headers: createAuthHeaders(),
  })

  const data = (await handleResponse(response)) as CancelResponse

  return data.viaje
}

export const fetchViajeById = async (id: string): Promise<Viaje> => {
  const response = await fetch(`${API_URL}/viajes/${id}`, {
    headers: createAuthHeaders(),
  })

  return handleResponse(response)
}
