import React from "react"

const WithLogger = (WrapedCompent) =>{
return (props)=>{
    console.log("this props",props)
    return <WrapedCompent {...props}/>
}
}

export default WithLogger