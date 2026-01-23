import { useState } from 'react';
import axiosInstance from '../../services/api';
import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';

function Animals() {

    const [animalData, setAnimalData] = useState({
        user_id: 101,
        specie: '',
        breed: '',
    });

    async function registerAnimal() {

        try {

            const { data } = await axiosInstance.post('/api/v1/animals', {
                user_id: animalData.user_id,
                specie: animalData.specie,
                breed: animalData.breed,
            });

            if (data.status) {

                setAnimalData({
                    ...animalData,
                    user_id: '', specie: '', breed: '',
                });

                Swal.fire({
                    icon: "success",
                    title: "Pet added successfully!",
                });
            }
        }

        catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h2> Cadastre seu animal </h2>
            <form>
                <input type="text" name="specie" value={animalData.specie} placeholder="Input your specie" id="specie" onChange={e => {
                    setAnimalData({
                        ...animalData, specie: e.target.value,
                    })
                }} />
                <input type="text" name="breed" value={animalData.breed} placeholder="Input your breed" id="breed" onChange={e => {
                    setAnimalData({
                        ...animalData, breed: e.target.value,
                    })
                }} />
                <button type="button" id="animal-button" onClick={registerAnimal}> Register </button>
            </form>

            <p>
                specie: {animalData.specie}
            </p>
            <p>
                breed: {animalData.breed}
            </p>
        </div>
    )

}

export default Animals;