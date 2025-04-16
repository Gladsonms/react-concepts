const Profile = ({data,setData}) =>{
    const {name,age,email}=data;
    console.log(name)


    const handleChange = (e,item) =>{
       setData(prevState =>({
        ...prevState,
        [item]:e.target.value,

       }))
    }
    return(
        <div>
        <h1>profile</h1>
        <div style={{ display:"flex",flexDirection:"column"}}>
        <label>name</label>
        <input type="text" value={name} onChange={(e)=>handleChange(e,"name")}></input>
        <label>age</label>
        <input type="text" value={age} onChange={(e)=>handleChange(e,"age")}></input>
        <label>email</label>
        <input type="text" value={email} onChange={(e) =>handleChange(e,"email")}></input>
        </div>
        </div>
    )
}
export default Profile;