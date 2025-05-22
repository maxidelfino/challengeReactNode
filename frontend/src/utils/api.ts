import type { Viaje, LoginResponse } from "../types"

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

// Login user
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

export const fetchViajes = async (): Promise<Viaje[]> => {
  const response = await fetch(`${API_URL}/viajes`, {
    headers: createAuthHeaders(),
  })

  return handleResponse(response)
}

export const createViaje = async (viaje: Omit<Viaje, "id">): Promise<Viaje> => {
  const response = await fetch(`${API_URL}/viajes`, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify(viaje),
  })

  return handleResponse(response)
}

export const updateViaje = async (viaje: Viaje): Promise<Viaje> => {
  const response = await fetch(`${API_URL}/viajes/${viaje.id}`, {
    method: "PUT",
    headers: createAuthHeaders(),
    body: JSON.stringify(viaje),
  })

  return handleResponse(response)
}

export const cancelViaje = async (id: string): Promise<Viaje> => {
  const response = await fetch(`${API_URL}/viajes/${id}`, {
    method: "DELETE",
    headers: createAuthHeaders(),
  })

  return handleResponse(response)
}
