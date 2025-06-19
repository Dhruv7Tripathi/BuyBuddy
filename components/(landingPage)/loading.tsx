import React from 'react'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-700 border-opacity-50"></div>
    </div>
  )
}
