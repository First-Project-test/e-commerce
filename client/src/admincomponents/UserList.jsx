import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserList() {
    const[banned,setbanned]=useState(Boolean)
    const[user,setuser]=useState([])
    const[search,setsearch]=useState("")
    const[filtered,setfiltered]=useState
    console.log("user");
    
    useEffect(async()=>{
        try {
  let data = await axios.get(`http://localhost:2080/api/users`)
            setuser(data.data)
 } catch (error) {
            console.log(error)
        }
},[])
  return (
    <div>
        <input type="text" placeholder='Search' defaultValue={search} onChange={(e)=>setsearch(e.target.value)} onKeyUp={(e)=>{
            if(e.key==='Enter'){
                setfiltered(search)
                setsearch("")
            }
            }} />
            <button onClick={()=>{
                setfiltered(search)
                setsearch("")
            }} >🔍</button>
       <table className='Usertable'>
        <tbody>

            <tr>
                <th>Name</th>
                <th>Id</th>
                <th>status</th>
            </tr>
            {user.filter((e)=>e.name.toLowerCase().includes(filtered.toLowerCase())).map((el)=>(
            <tr>
                <th>{el.name}</th>
                <th>{el.id}</th>
                <th>{el.banned==true ? "banned" :"not-banned"} 
                    <button 
                    onClick={async()=>{
                        setbanned(!el.banned)
                        try {
                            await axios.put(`http://localhost:2080/api/users/ban/${el.id}`,{banned})
                       
                        } catch (error) {
                            console.log(error);
                            
                        }

                    }}
                    >{"ban" ? el.banned==true:"unban"}</button>
                </th>
                
            </tr>
            ))}
        </tbody>
            </table>
    </div>
  )
}

export default UserList
