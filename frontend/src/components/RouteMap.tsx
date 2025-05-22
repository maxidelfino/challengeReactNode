"use client"

import { useEffect, useRef } from "react"

interface RouteMapProps {
  origen: string
  destino: string
}

const RouteMap = ({ origen, destino }: RouteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = mapRef.current.clientWidth
    canvas.height = 300
    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(canvas)

    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.moveTo(50, 150)
    ctx.bezierCurveTo(canvas.width / 3, 50, (2 * canvas.width) / 3, 250, canvas.width - 50, 150)
    ctx.strokeStyle = "#2563eb"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(50, 150, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#16a34a"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(canvas.width - 50, 150, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#dc2626"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.font = "14px Arial"
    ctx.fillStyle = "#111827"
    ctx.textAlign = "center"

    ctx.fillText(origen, 50, 180)

    ctx.fillText(destino, canvas.width - 50, 180)

    ctx.font = "12px Arial"
    ctx.fillStyle = "#6b7280"
    ctx.textAlign = "left"
    ctx.fillText("Nota: Esta es una representación esquemática de la ruta.", 10, canvas.height - 10)
  }, [origen, destino, mapRef])

  return (
    <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ruta del Viaje</h3>
        <div ref={mapRef} className="h-[300px] bg-gray-100 rounded-md"></div>
    </div>
  )
}

export default RouteMap
