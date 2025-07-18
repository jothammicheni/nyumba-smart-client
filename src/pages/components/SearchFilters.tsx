"use client"

import type React from "react"
import { Search, Filter } from "lucide-react"
import type { Filters } from "../../types/properties"

interface SearchFiltersProps {
  searchTerm: string
  filters: Filters
  showFilters: boolean
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  onToggleFilters: () => void
  onClearFilters: () => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  filters,
  showFilters,
  onSearchChange,
  onFilterChange,
  onToggleFilters,
  onClearFilters,
}) => {
  return (
    <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-primary-600" />
          </div>
          <input
            type="text"
            placeholder="Search by property, location or keyword..."
            value={searchTerm}
            onChange={onSearchChange}
            className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-800/90 shadow-xl rounded-lg bg-gray-50 dark:bg-gray-950/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary-600 focus:border-primary-500 transition-all"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className="flex items-center justify-center px-5 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-sm"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-950/50 rounded-lg border border-gray-200 dark:border-gray-800/90">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={onFilterChange}
                className="w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
              >
                <option value="all">All Types</option>
                <option value="Single">Single</option>
                <option value="Bedseater">Bedseater</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="2 Bedroom">2 Bedroom</option>
                <option value="3 Bedroom">3 Bedroom</option>
                <option value="4 Bedroom">4 Bedroom</option>
              </select>
            </div>

            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Price (KES)
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={onFilterChange}
                placeholder="10,000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Price (KES)
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={onFilterChange}
                placeholder="100,000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
              />
            </div>

            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={onFilterChange}
                className="w-full px-4 py-2 text-gray-500 border border-gray-300 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus:ring-primary-600 focus:border-primary-600 transition-all"
              >
                <option value="any">Any</option>
                <option value="0">Studio</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={filters.featured}
                  onChange={onFilterChange}
                  className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-1 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-500">Featured Only</span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm font-medium rounded text-gray-700 hover:bg-primary-600/20 dark:text-gray-300 hover:text-gray-900 dark:hover:bg-primary-600/10 dark:hover:text-white"
            >
              Clear All
            </button>
            <button
              onClick={onToggleFilters}
              className="px-4 py-2 bg-primary-600 dark:bg-primary-600/20 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
