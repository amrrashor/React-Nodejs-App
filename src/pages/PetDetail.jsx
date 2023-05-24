import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

const PetDetail = ({setPetToEdit}) => {
    const [pet, setPet] = useState([]);
    const { petId } = useParams();

    useEffect(() => {
        const getPet = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/pets/${petId}`);
                if (response.status === 200) {
                    setPet(response.data);
                    setPetToEdit(response.data)
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    }, [])

    const deletePet = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/pets/${petId}`);
            if (response === 200) {
                window.location.href = '/'
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div>
            <h2>pet detail</h2>

            {pet && <div>
                <p>{pet.name}</p>
                <p>{pet.type}</p>
                <p>{pet.age}</p>

                <Link to={`http://localhost:3000/pets/${petId}/edit`}>
                    <button>Edit pet</button>
                </Link>

                <button onClick={() => deletePet()}>
                    delete pet
                </button>
            </div>}
        </div>
    )
}

export default PetDetail