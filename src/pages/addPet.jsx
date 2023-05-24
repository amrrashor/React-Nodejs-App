import axios from 'axios';
import React, {useState} from 'react'

const AddPet = () => {
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petBreed, setPetBreed] = useState();

    const addPet = async () => {
        try {
                const petData = {
                name: petName,
                type: petType,
                breed: petBreed,
                age: petAge
            }
            
            const response = await axios.post('http://localhost:3000/pets/', petData, { headers: { "Content-Type": 'application/json' } })
            if (response.data === 200) {
                window.location.href = `/${response.data.id}`
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
            <div>
                <h2>add pet</h2>

            <input
                type="text"
                onChange={(e) => setPetName(e.target.value)}
            />

            <input
                type="text"
                onChange={(e) => setPetAge(e.target.value)}
            />

            <input
                onChange={(e) => setPetBreed(e.target.value)}
                type="text"
            />

            <input
                onChange={(e) => setPetType(e)}
                type="text"
            />
            <button onClick={() => addPet()}>Add</button>
            </div>
    )
}

export default AddPet