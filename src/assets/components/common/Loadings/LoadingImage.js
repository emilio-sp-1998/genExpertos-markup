import React from 'react'

export default function LoadingImage(props) {
  return (
    <div role="status" className="animate-pulse md:flex md:items-center">
      <div className="flex items-center justify-center bg-gray-300 rounded-full">
        {props.children}
      </div>
      <span className="sr-only">Loading...</span>
  </div>
  )
}
