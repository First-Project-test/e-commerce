import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/Dashboard.css'

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
            setuser(data.data.users)
        } catch (error) {
            console.log(error)
        }
    }), [])

    const handleSearch = () => {
        setfiltered(search)
    }

    return (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1>User Management</h1>
                <div className="search-container">
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={search}
                            onChange={(e) => setsearch(e.target.value)} 
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch()
                                }
                            }}
                            className="search-input"
                        />
                        <button 
                            className="search-button"
                            onClick={handleSearch}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user
                                .filter((e) => e.username.toLowerCase().includes(filtered.toLowerCase()))
                                .map((el, i) => (
                                    <tr key={i}>
                                        <td>{el.username}</td>
                                        <td>{el.id}</td>
                                        <td>
                                            <span className={el.banned ? "status-banned" : "status-active"}>
                                                {el.banned ? "Banned" : "Active"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className={`action-button ${el.banned ? "delete-btn" : "view-details-btn"}`}
                                                onClick={async () => {
                                                    setbanned(!el.banned)
                                                    try {
                                                        await axios.put(
                                                            `http://localhost:2080/api/users/ban/${el.id}`,
                                                            { banned: !el.banned },
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`
                                                                }
                                                            }
                                                        )
                                                        // Update the user list after successful ban/unban
                                                        const updatedUsers = user.map(u => 
                                                            u.id === el.id ? {...u, banned: !el.banned} : u
                                                        )
                                                        setuser(updatedUsers)
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
                                                }}
                                            >
                                                {el.banned ? "Unban" : "Ban"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList
