import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserList() {
    const [banned, setbanned] = useState(Boolean)
    const [user, setuser] = useState([])
    const [search, setsearch] = useState("")
    const [filtered, setfiltered] = useState("")

    const token = localStorage.getItem("token")

    useEffect(() => (async () => {
        try {
            let data = await axios.get(`http://localhost:2080/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("uqers", data.data.users);
            setuser(data.data.users)

        } catch (error) {
            console.log(error)
        }
    }), [])
    return (
        <div>
            <input type="text" placeholder='Search' defaultValue={search} onChange={(e) => setsearch(e.target.value)} onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    setfiltered(search)
                    setsearch("")
                }
            }} />
            <button onClick={() => {
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
                    {user.map((el) => (
                        <tr>
                            <th>{el.username}</th>
                            <th>{el.id}</th>
                            <th>{el.banned == true ? "banned" : "not-banned"}
                                <button
                                    onClick={async () => {
                                        setbanned(!el.banned)
                                        try {
                                            await axios.put(`http://localhost:2080/api/users/ban/${el.id}`, { banned }, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            })

                                        } catch (error) {
                                            console.log(error);
                                        }

                                    }}
                                >{"ban" ? el.banned == true : "unban"}</button>
                            </th>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList
