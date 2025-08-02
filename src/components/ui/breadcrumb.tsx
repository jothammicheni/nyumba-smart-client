import React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface BreadcrumbItem {
  label: string
  path: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 md:mx-2" />
            )}
            {item.active ? (
              <span className="text-gray-500 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
