import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function PetList() {
    const [pets, setPets] = useState([])
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getPets = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                if (response.status === 200) {
                    setPets(response.data);
                    setloading(false);
                } else {
                    setError(true)
                }
            } catch (error) {
                setError(true);
                console.log(error)
            }
        }


        getPets()
    }, [])


    if (loading) {
        <p>...loading</p>
    } 

    if (error) {
        <p>Error handling the request</p>
    }
    return (
        <>
            <h2>Pet List</h2>

            {pets?.map((pet) => {
                return (
                    <div key={pet?.id}>
                        <p>{pet?.title} - {pet?.type} - {pet?.breed}</p>

                        <Link to={`/${pet?.id}`}>
                            <button>Pet detail</button>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default PetList