import { NavLink } from "react-router";
import axiosInstance from '../../services/api';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './style.css';

function SignUp() {


    const schema = yup
        .object({
            name: yup.string().required().min(3).max(255),
            email: yup.string().required().email().max(255),
            password: yup.string().required().min(8).max(255),
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
            email: "",
            password: "",
        }
    });

    async function signup(filledData) {

        try {

            const { data } = await axiosInstance.post('/api/v1/users', {
                name: filledData.name,
                email: filledData.email,
                password: filledData.password,
            });

            if (data.status) {

                reset();

                Swal.fire({
                    icon: "success",
                    title: "Sign up successful!",
                });
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="d-flex p-0 m-0 min-vh-100">
                <div className="col-xl-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className="container custom-width p-4">
                        <div id="header">
                            <h2 className="fs-2 mb-5">
                                <NavLink className="text-dark text-decoration-none" to="/"> PetShop
                                    <span className="text-warning fw-bold"> Life </span>
                                </NavLink>
                            </h2>
                            <h3>Join PetShop Life and book services for your pet.</h3>
                            <p className="mt-3">Sign up and schedule your pet’s grooming with us today.</p>
                        </div>

                        <form className="row mt-5 gap-4" onSubmit={handleSubmit(signup)}>
                            <div className="col-12 has-validation">
                                <label htmlFor="name" className="form-label">Name*</label>
                                <input type="text" className={`form-control p-3 ${errors.name?.message ? 'is-invalid' : ''}`} id="name" placeholder="Enter your name" {...register("name")} />
                                <div className={errors.name?.message ? 'invalid-feedback' : ''}>
                                    {errors.name?.message}
                                </div>
                            </div>
                            <div className="col-12 has-validation">
                                <label htmlFor="email" className="form-label">Email*</label>
                                <input type="text" className={`form-control p-3 ${errors.email?.message ? 'is-invalid' : ''}`} id="email" placeholder="Enter your e-mail" {...register("email")} />
                                <div className={errors.email?.message ? 'invalid-feedback' : ''}>
                                    {errors.email?.message}
                                </div>
                            </div >
                            <div className="col-12 has-validation">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <input type="password" className={`form-control p-3 ${errors.password?.message ? 'is-invalid' : ''}`} id="password" placeholder="Enter your password" {...register("password")} />
                                <div className={errors.password?.message ? 'invalid-feedback' : ''}>
                                    {errors.password?.message}
                                </div>
                            </div >
                            <div className="col-12">
                                <button type="submit" className="d-flex align-items-center justify-content-center gap-2 btn btn-warning fw-bold w-100">
                                    Get Started
                                    <i className="bi bi-arrow-bar-right fs-2 text-dark"></i>
                                </button>
                            </div >
                        </form >
                        <p className="mt-4">
                            Already have an account?
                            <NavLink className="text-warning fw-bold" to="/signin"> Sign In </NavLink>
                        </p>
                    </div>
                </div>
                <img src="https://images.pexels.com/photos/4444935/pexels-photo-4444935.jpeg"
                    alt="Barber Shop" className="d-none d-xl-block vh-100 object-fit-cover col-xl-6" />
            </div>
        </div >
    )

}

export default SignUp;