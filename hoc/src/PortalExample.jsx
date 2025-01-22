import React from 'react'
import ReactDOM from"react-dom"

const PortalExample = ({children}) => {
  return ReactDOM.createPortal(
    <div style={{ backgroundColor:"blue"}}>
        {children}
    </div>,
    document.getElementById("portal-root")
  )
}

export default PortalExample
