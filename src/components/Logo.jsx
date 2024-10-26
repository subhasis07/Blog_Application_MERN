import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img 
      src="/blog-App.png" 
      alt="Blog Logo"
      style={{ width }} 
    />
  )
}

export default Logo