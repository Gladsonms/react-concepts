import { useEffect } from "react";



const apiUrl=""
 const Api = () => {
    const [apiData,setApiData]=useState([])
    useEffect(()=>{
     const featchData = async() =>{
        try{
            fetch(apiUrl).then((response)=>{
                if(response.ok){
                    setApiData(response.json())
                }else{
                    alert("unable to fetch data")
                }
            })
        }catch(err){
            alert("error in api")
        }
     }
     featchData();
    },[])
    return(
        <div>
            this is to show api data
        </div>
    )
 }
 export default Api;