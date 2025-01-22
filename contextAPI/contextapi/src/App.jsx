import {createContext, useState } from 'react'
import './App.css'
import ComponentC from './component/ComponentC'

export const userContext=createContext()
function App() {
   const user={
    name:"gladson",
    age:null
   }

   const [userData,setUserData]=useState(user)

   const updateAge = () =>{
    setUserData(prev => ({...prev,age:25}))
   }
  return (
    <>
    <userContext.Provider value={{userData,updateAge}}>
      <ComponentC></ComponentC>
    </userContext.Provider>
    </>
  )
}

export default App
