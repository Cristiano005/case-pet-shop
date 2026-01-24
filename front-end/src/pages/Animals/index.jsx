import axiosInstance from '../../services/api';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './style.css';

function Animals() {

    const schema = yup
        .object({
            name: yup.string().required().min(3).max(255),
            specie: yup.string().required().max(255),
            breed: yup.string().required().max(255),
            sex: yup.string().required().oneOf(['male', 'female']),
            age: yup.number().positive().required(),
            weight: yup.number().typeError("weight is a required field").positive().required(),
            annotations: yup.string().nullable(),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            specie: "",
            breed: "",
            sex: "male",
            age: null,
            weight: null,
            annotations: "",
        }
    });

    async function registerAnimal(petData) {

        try {

            const { data } = await axiosInstance.post('/api/v1/animals', {
                user_id: 101,
                specie: petData.specie,
                breed: petData.breed,
                sex: petData.sex,
                age: petData.age,
                weight: petData.weight,
                annotations: petData.annotations
            });

            if (data.status) {

                reset();

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

        <div className="container">

            <h2> Cadastre seu animal </h2>

            <form className="row mt-5 gap-4" onSubmit={handleSubmit(registerAnimal)}>

                <div className="row col-12">
                    <div className="col-4 has-validation">
                        <label htmlFor="name" className="form-label">Name*</label>
                        <input type="text" className={`form-control p-3 ${errors.name?.message ? 'is-invalid' : ''}`} id="name" placeholder="Enter your name" {...register("name")} />
                        <div className={errors.name?.message ? 'invalid-feedback' : ''}>
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="col-4 has-validation">
                        <label htmlFor="specie" className="form-label">Specie*</label>
                        <input type="text" className={`form-control p-3 ${errors.specie?.message ? 'is-invalid' : ''}`} id="specie" placeholder="Enter your specie" {...register("specie")} />
                        <div className={errors.specie?.message ? 'invalid-feedback' : ''}>
                            {errors.specie?.message}
                        </div>
                    </div>
                    <div className="col-4 has-validation">
                        <label htmlFor="breed" className="form-label">Breed*</label>
                        <input type="text" className={`form-control p-3 ${errors.breed?.message ? 'is-invalid' : ''}`} id="breed" placeholder="Enter your breed" {...register("breed")} />
                        <div className={errors.breed?.message ? 'invalid-feedback' : ''}>
                            {errors.breed?.message}
                        </div>
                    </div>
                </div>

                <div className="row col-12 align-items-center">

                    <div className="col-4 has-validation">
                        <label htmlFor="sex" className="form-label">Sex*</label>
                        <select className="form-select p-3" aria-label="Default select example" id="sex" {...register("sex")}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div >
                    <div className="col-4 has-validation">
                        <label htmlFor="age" className="form-label">
                            Age*
                            <div className={errors.age?.message ? 'invalid-feedback' : ''}>
                                {errors.age?.message}
                            </div>
                        </label>
                        <input type="number" step="0.1" min="0" max="100" className={`form-control p-3 ${errors.age?.message ? 'is-invalid' : ''}`} id="age" placeholder="Years and/or months" {...register("age")} />

                    </div >
                    <div className="col-4 has-validation">
                        <label htmlFor="weight" className="form-label">Weight*</label>
                        <input type="number" step="0.01" min="0" max="100" className={`form-control p-3 ${errors.weight?.message ? 'is-invalid' : ''}`} id="weight" placeholder="0.00 Kg" {...register("weight")} />
                        <div className={errors.weight?.message ? 'invalid-feedback' : ''}>
                            {errors.weight?.message}
                        </div>
                    </div >

                </div>

                <div className="row col-12">
                    <div className="col-12 has-validation">
                        <label htmlFor="annotations" className="form-label">Annotations (optional)</label>
                        <textarea className={`form-control p-3 ${errors.annotations?.message ? 'is-invalid' : ''}`} id="annotations" placeholder="Any observation?" {...register("annotations")}></textarea>
                        <div className={errors.annotations?.message ? 'invalid-feedback' : ''}>
                            {errors.annotations?.message}
                        </div>
                    </div >
                </div>

                <div className="row col-12">
                    <div className="col-2 justify-item-end ms-auto">
                        <button type="submit" className="d-flex align-items-center justify-content-center gap-2 btn btn-warning fw-bold w-100 p-2">
                            Save Pet
                            <i class="bi bi-file-earmark-medical-fill fs-6"></i>
                        </button>
                    </div >
                </div>

            </form >

        </div>
    )

}

export default Animals;