
import { useEffect, useState } from "react";

const api = "https://dummyjson.com/users";

function User() {

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUser,setFilteredUserList]=useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(api);
      const result = await response.json();
      console.log("response", response);
      setUsers(result.users);
      setFilteredUserList(result.users)
    };

    fetchUser()
  }, []);



  useEffect(() => {
    if (!searchValue) {
      setFilteredUserList(users);
      return;
    }
  
    setFilteredUserList(
      users.filter((user) =>
        user.firstName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [users, searchValue]);
  

  return (
    <>
     <input value={searchValue}  onChange={(e)=>setSearchValue(e.target.value)}/>
     {filteredUser?.map((user) => (
        <div key={user.id}>
            {user.firstName}
        </div>
     ))}
     
    </>
  )
}

export default User;
