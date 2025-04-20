"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, X } from "lucide-react"

interface FilterModalProps {
  onClose: () => void
  appliedFilters: string[]
  setAppliedFilters: (filters: string[]) => void
}

export function FilterModal({ onClose, appliedFilters, setAppliedFilters }: FilterModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string[]>(
    appliedFilters.filter((f) => f.startsWith("location:")).map((f) => f.replace("location:", "")),
  )
  const [selectedScore, setSelectedScore] = useState<string>(
    appliedFilters.find((f) => f.startsWith("score:"))?.replace("score:", "") || "",
  )

  const locations = [
    "India",
    "United Kingdom",
    "United States of America",
    "France",
    "Saudi Arabia",
    "Germany",
    "Singapore",
    "China",
    "Taiwan",
  ]

  const filteredLocations = locations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleApplyFilters = () => {
    const newFilters: string[] = []

    if (selectedLocation.length > 0) {
      selectedLocation.forEach((loc) => {
        newFilters.push(`location:${loc}`)
      })
    }

    if (selectedScore) {
      newFilters.push(`score:${selectedScore}`)
    }

    setAppliedFilters(newFilters)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 4H14M4 8H12M6 12H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium">Filters</span>
              {appliedFilters.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                  {appliedFilters.length}
                </span>
              )}
            </div>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">See results in your view based on the filters you select here.</p>
        </div>

        <div className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-md bg-blue-100 px-3 text-sm text-blue-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Location
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs">
                {selectedLocation.length || 2}
              </span>
            </div>

            <div className="flex h-8 items-center gap-2 rounded-md bg-gray-100 px-3 text-sm text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Score
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs">
                {selectedScore ? 1 : 0}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">Location</h3>
              <span className="text-xs text-blue-600">16 applied</span>
            </div>
            <p className="mb-2 text-sm text-gray-500">Select options to filter results</p>

            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-[200px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <div key={location} className="flex items-center py-2">
                  <input
                    type="checkbox"
                    id={`location-${location}`}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedLocation.includes(location)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLocation([...selectedLocation, location])
                      } else {
                        setSelectedLocation(selectedLocation.filter((l) => l !== location))
                      }
                    }}
                  />
                  <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
