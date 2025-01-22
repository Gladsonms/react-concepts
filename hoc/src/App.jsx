import { useState } from 'react'
import './App.css'
import WithLogger from './WithLogger'
import Greetings from './Greetings'
import Testone from './Testone'
import PortalExample from "./PortalExample"

const LoggerGreeting=WithLogger(Greetings)
const LoggerTest=WithLogger(Testone)
function App() {

  return (
    <div>
     <LoggerGreeting name="gldson m s"/>
     {/* <LoggerTest name="palakkad" /> */}
     <PortalExample>
      <h1>this is example of partal</h1>
     </PortalExample>
    </div>
  )
}

export default App
