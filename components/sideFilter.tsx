"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface FilterState {
  availability: {
    all: boolean
    inStock: boolean
    outOfStock: boolean
  }
  price: {
    min: number
    max: number
  }
  brands: {
    apple: boolean
    lenovo: boolean
    samsung: boolean
  }
}

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    availability: {
      all: true,
      inStock: false,
      outOfStock: false,
    },
    price: {
      min: 500,
      max: 1700,
    },
    brands: {
      apple: false,
      lenovo: false,
      samsung: true,
    },
  })

  const [sliderValue, setSliderValue] = useState<[number, number]>([filters.price.min, filters.price.max])

  const handleAvailabilityChange = (key: keyof typeof filters.availability) => {
    if (key === "all" && !filters.availability.all) {
      setFilters({
        ...filters,
        availability: {
          all: true,
          inStock: false,
          outOfStock: false,
        },
      })
      return
    }

    const newAvailability = {
      ...filters.availability,
      [key]: !filters.availability[key],
      all: key === "all" ? !filters.availability.all : false,
    }

    setFilters({
      ...filters,
      availability: newAvailability,
    })
  }

  const handleBrandChange = (key: keyof typeof filters.brands) => {
    setFilters({
      ...filters,
      brands: {
        ...filters.brands,
        [key]: !filters.brands[key],
      },
    })
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue([value[0], value[1]])
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setFilters({
      ...filters,
      price: {
        ...filters.price,
        min: value,
      },
    })
    setSliderValue([value, sliderValue[1]])
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setFilters({
      ...filters,
      price: {
        ...filters.price,
        max: value,
      },
    })
    setSliderValue([sliderValue[0], value])
  }

  const applyChanges = () => {
    const updatedFilters = {
      ...filters,
      price: {
        min: sliderValue[0],
        max: sliderValue[1],
      },
    }
    setFilters(updatedFilters)
    if (onFilterChange) {
      onFilterChange(updatedFilters)
    }
  }

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      price: {
        min: sliderValue[0],
        max: sliderValue[1],
      },
    }))
  }, [sliderValue])

  return (
    <div className="w-full max-w-xs bg-white rounded-lg border border-gray-100 p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Availability</h3>
        <div className="space-y-2 text-black">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability-all"
              checked={filters.availability.all}
              onCheckedChange={() => handleAvailabilityChange("all")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="availability-all"
              className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              All
            </label>
          </div>
          <div className="flex text-black items-center space-x-2">
            <Checkbox
              id="availability-instock"
              checked={filters.availability.inStock}
              onCheckedChange={() => handleAvailabilityChange("inStock")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="availability-instock"
              className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability-outofstock"
              checked={filters.availability.outOfStock}
              onCheckedChange={() => handleAvailabilityChange("outOfStock")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="availability-outofstock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Out of Stock
            </label>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Price</h3>
        <div className="px-2">
          <Slider
            defaultValue={[filters.price.min, filters.price.max]}
            value={sliderValue}
            min={0}
            max={3000}
            step={10}
            onValueChange={handleSliderChange}
            className="py-4"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <label htmlFor="price-from" className="text-sm text-gray-500">
              From
            </label>
            <Input
              id="price-from"
              type="number"
              value={filters.price.min}
              onChange={handleMinPriceChange}
              className="h-9"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="price-to" className="text-sm text-gray-500">
              To
            </label>
            <Input
              id="price-to"
              type="number"
              value={filters.price.max}
              onChange={handleMaxPriceChange}
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Brands</h3>
        <div className="space-y-2 text-black \">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brand-apple"
              checked={filters.brands.apple}
              onCheckedChange={() => handleBrandChange("apple")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="brand-apple"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apple
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brand-lenovo"
              checked={filters.brands.lenovo}
              onCheckedChange={() => handleBrandChange("lenovo")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="brand-lenovo"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lenovo
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brand-samsung"
              checked={filters.brands.samsung}
              onCheckedChange={() => handleBrandChange("samsung")}
              className="data-[state=checked]:bg-gray-600 border-gray-600 data-[state=checked]:border-gray-600"
            />
            <label
              htmlFor="brand-samsung"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Samsung
            </label>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <Button onClick={applyChanges} className="w-full bg-gray-600 hover:bg-gray-800 text-white">
        Apply Changes
      </Button>
    </div>
  )
}
