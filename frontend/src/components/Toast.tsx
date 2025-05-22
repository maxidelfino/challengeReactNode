"use client"

import { useState, useEffect } from "react"
import { XIcon } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
  duration?: number
}

const Toast = ({ message, type, onClose, duration = 5000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : type === "error"
        ? "bg-red-100 border-red-400 text-red-700"
        : "bg-blue-100 border-blue-400 text-blue-700"

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-3 rounded border ${bgColor} transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-2">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="ml-auto"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
