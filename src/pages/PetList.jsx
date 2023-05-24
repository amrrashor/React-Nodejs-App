import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function PetList() {
    // const [pets, setPets] = useState([])
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState('ASCENDING');
    const [alphaOrder, setAlphaOrder] = useState('ASCENDING');
    const [alphaNumOrder, setAlphaNumOrder] = useState('ASCENDING');
    const { userId } = useParams();
    //SORT USERS BY THEIR AGE
    const sortUsers = () => {
        let sortedUsers;
        if (order === 'ASCENDING') { 
            sortedUsers = [...users].sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
            setOrder('DESCENDING');
        } else if (order === 'DESCENDING') {
            sortedUsers = [...users].sort((a, b) => b.id - a.id);
            setUsers(sortedUsers);
            setOrder('ASCENDING')
        }
    }

    //SORT USERS ALPHAPITACALLY
    const sortUsersByAlphapet = () => {
        let sortedUsers;
        if (alphaOrder === 'ASCENDING') {
            sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));
            setUsers(sortedUsers);
            setAlphaOrder('DESCENDING')
        } else if (alphaOrder === 'DESCENDING') {
            sortedUsers = [...users].sort((a, b) => b.username.localeCompare(a.username));
            setUsers(sortedUsers);
            setAlphaOrder('ASCENDING');
        }
    }

    //SORT USERS BASED ON NAME AND AGE
    const sortUserByAgeAndName = () => {
        let sortedData;
        if (alphaNumOrder === 'ASCENDING') {
            sortedData = [...users].sort((a, b) => {
                if (a.id !== b.id) {
                    return a.id - b.id;
                } else {
                    return a.username.localeCompare(b.username);
                }
            })
            setAlphaNumOrder('DESCENDING');
        } else {
            sortedData = [...users].sort((a, b) => {
                if (a.id !== b.id) {
                    return b.id - a.id;
                } else {
                    return b.username.localeCompare(a.username);
                }
            })
            setAlphaNumOrder('ASCENDING')
        }
        setUsers(sortedData)
    }

    const deleteUser = (userId) => {
        const updatedUsers = [...users].filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                if (response.status === 200) {
                    setUsers(response.data);
                    setloading(false);
                } else {
                    setError(true)
                }
            } catch (error) {
                setError(true);
                console.log(error)
            }
        }
        getUsers()
    }, [])

    if (loading) {
        <p>...loading</p>
    } 

    if (error) {
        <p>Error handling the request</p>
    }
    return (
        <>
            <h2>user List</h2>
            <button onClick={sortUsers}>Sort Users based on age</button>
            <button onClick={sortUsersByAlphapet}>Sort Users based on name</button>
            <button onClick={sortUserByAgeAndName}>Sort Users by name and age</button>
            {users?.map((user) => {
                return (
                    <div key={user?.id}>
                        <h3>{user?.username}</h3>
                        <p>{user?.id}</p>
                        <p>{user?.email}</p>
                        <button onClick={() => deleteUser(user.id)}>delete</button>
                    </div>
                )
            })}
        </>
    )
}

export default PetList