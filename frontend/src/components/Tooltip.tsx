import { useState, type ReactNode } from "react"

interface TooltipProps {
  content: string
  children: ReactNode
  className?: string
}

const Tooltip = ({ content, children, className = "" }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md whitespace-normal max-w-xs -mt-1 left-1/2 transform -translate-x-1/2 -translate-y-full">
          {content}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
    </div>
  )
}

export default Tooltip