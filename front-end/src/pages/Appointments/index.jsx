import axiosInstance from '../../services/api';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

function Appointments() {

    const [ownAnimals, setOwnAnimals] = useState([]);
    const [services, setServices] = useState([]);
    const [freeDays, setFreeDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const schema = yup
        .object({
            animal_id: yup.string().required('pet is a required field'),
            service_id: yup.string().required('service is a required field'),
            day: yup.date().typeError("date is a required field").required(),
            hour: yup.string().required(),
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
            animal_id: "",
            service_id: "",
            day: "",
            hour: "",
            annotations: "",
        }
    });


    async function getOwnAnimals() {

        try {
            const { data } = await axiosInstance.get(`/api/v1/animals/user/${100}`);
            setOwnAnimals(data.data);
            console.log(data);
        }

        catch (error) {
            console.log(error);
        }

    }

    async function getAllServices() {

        try {
            const { data } = await axiosInstance.get('/api/v1/services');
            setServices(data);
        }

        catch (error) {
            console.log(error);
        }
    }

    async function getFreeDays() {

        try {
            const { data } = await axiosInstance.get('/api/v1/free-schedules?available=true');
            setFreeDays(data.data);
        }

        catch (error) {
            console.log(error);
        }
    }

    async function registerAppointment(appointmentData) {

        try {

            const { data } = await axiosInstance.post('/api/v1/appointments', {
                user_id: 100,
                animal_id: appointmentData.animal_id,
                service_id: appointmentData.service_id,
                appointment_date: appointmentData.appointment_date,
                status: 'scheduled',
                annotations: appointmentData.annotations
            });

            if (data.status) {

                reset();

                Swal.fire({
                    icon: "success",
                    title: "Appointment scheduled successfully!",
                });
            }
        }

        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getOwnAnimals();
        getAllServices();
        getFreeDays();
    }, []);

    return (
        <div className='container'>

            <h2> Schedule Appointment
                <i className="bi bi-calendar-check ms-2"></i>
            </h2>

            <form className="row mt-5 gap-4" onSubmit={handleSubmit(registerAppointment)}>

                <div className="row col-12">

                    <div className="col-3 has-validation">

                        <label htmlFor="pet" className="form-label">Pets*</label>

                        <select className={`form-control p-3 ${errors.animal_id?.message ? 'is-invalid' : ''}`} id="pet"
                            placeholder="Enter your animal" {...register("animal_id")} >
                            <option value=""> Select an pet </option>
                            {ownAnimals.map(myAnimal => <option value={myAnimal.id} key={myAnimal.id}> {myAnimal.name} </option>)}
                        </select>

                        <div className={errors.animal_id?.message ? 'invalid-feedback' : ''}>
                            {errors.animal_id?.message}
                        </div>

                    </div>

                    <div className="col-3 has-validation">

                        <label htmlFor="service" className="form-label">Services*</label>

                        <select className={`form-control p-3 ${errors.service_id?.message ? 'is-invalid' : ''}`} id="service"
                            placeholder="Enter your service" {...register("service_id")} >
                            <option value=""> Select a service</option>
                            {services.map(service => <option value={service.id} key={service.id}> {service.name} - R$ {service.price} </option>)}
                        </select>

                        <div className={errors.service_id?.message ? 'invalid-feedback' : ''}>
                            {errors.service_id?.message}
                        </div>
                    </div>

                    <div className="col-3 has-validation">

                        <label htmlFor="day" className="form-label">Day*</label>

                        <select className={`form-control p-3 ${errors.day?.message ? 'is-invalid' : ''}`} id="day"
                            placeholder="Choose a day" {...register("day", {
                                onChange: (e) => setSelectedDay(e.target.value)
                            })}>
                            <option value=""> Select a day</option>
                            {Object.keys(freeDays).map(day => <option value={day} key={day}> 
                                { new Date(day).toLocaleDateString('pt-BR', { weekday: "long", year: "numeric", month: "short", day: "numeric" }) } </option>)}
                        </select>

                        <div className={errors.day?.message ? 'invalid-feedback' : ''}>
                            {errors.day?.message}
                        </div>
                    </div>
                    <div className="col-3 has-validation">

                        <label htmlFor="hour" className="form-label">Hour*</label>

                        <select disabled={!selectedDay} className={`form-control p-3 ${errors.hour?.message ? 'is-invalid' : ''}`} id="hour"
                            placeholder="Choose an hour" {...register("hour")} >
                            <option value=""> Select an hour</option>
                            {freeDays[selectedDay]?.map(hour => <option value={hour} key={hour}> {hour} </option>)}
                        </select>

                        <div className={errors.hour?.message ? 'invalid-feedback' : ''}>
                            {errors.hour?.message}
                        </div>
                    </div>
                </div>

                <div className="row col-12">
                    <div className="col-12 has-validation">
                        <label htmlFor="appointment-annotations" className="form-label">Annotations (optional)</label>
                        <textarea className={`form-control p-3 annotations ${errors.annotations?.message ? 'is-invalid' : ''}`} id="appointment-annotations" placeholder="Any observation?" {...register("annotations")}></textarea>
                        <div className={errors.annotations?.message ? 'invalid-feedback' : ''}>
                            {errors.annotations?.message}
                        </div>
                    </div >
                </div>

                <div className="row col-12">
                    <div className="col-auto justify-item-end ms-auto">
                        <button type="submit" className="d-flex align-items-center justify-content-center gap-2 btn btn-warning fw-bold w-100 p-2">
                            Schedule
                            <i className="bi bi-file-earmark-medical-fill fs-6"></i>
                        </button>
                    </div >
                </div>

            </form >
        </div>
    )

}

export default Appointments;