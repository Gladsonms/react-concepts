import React,{useContext} from 'react'
import { userContext } from '../App'

const ComponentF = () => {
  const {userData,updateAge}=useContext(userContext)
  const showAge = ()=>{
  updateAge()
  }
  return (
    <div>
      this is F
      {userData.name}

      {
        userData.age ? (
          <>
          age is {userData.age}
          </>
        ):(
          <button onClick={showAge}>show</button>

        )
      }
    </div>
  )
}

export default ComponentF
