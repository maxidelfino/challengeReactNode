interface StatusBadgeProps {
  estado: string
}

const StatusBadge = ({ estado }: StatusBadgeProps) => {
  let bgColor = ""
  let textColor = ""

  switch (estado) {
    case "En tránsito":
      bgColor = "bg-blue-100"
      textColor = "text-blue-800"
      break
    case "Finalizado":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      break
    case "Cancelado":
      bgColor = "bg-red-100"
      textColor = "text-red-800"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {estado}
    </span>
  )
}

export default StatusBadge
