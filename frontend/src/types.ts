export interface Viaje {
  _id: string
  camion: string
  conductor: string
  origen: string
  destino: string
  combustible: string
  cantidad_litros: number
  fecha_salida: string
  estado: string
}

export interface CancelResponse {
  message: string
  viaje: Viaje
}

export interface User {
  id: string
  email: string
  role: string
}

export interface LoginResponse {
  message: string
  user: User
  token: string
}

export interface ViajeStats {
  total: number
  enTransito: number
  finalizados: number
  cancelados: number
  totalLitros: number
  combustibles: Record<string, number>
}
