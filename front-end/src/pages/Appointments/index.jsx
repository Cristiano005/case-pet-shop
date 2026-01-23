import { useState } from "react";
import axiosInstance from "../../services/api";
import Swal from 'sweetalert2';

function Appointments() {

    const [appointmentData, setAppointmentData] = useState({
        user_id: 101,
        animal_id: 102,
        appointment_date: '2026-02-02 11:00:00',
        status: 'scheduled',
    });

    async function registerAppointment() {

        try {

            const { data } = await axiosInstance.post('/api/v1/appointments', {
                user_id: appointmentData.user_id,
                animal_id: appointmentData.animal_id,
                appointment_date: appointmentData.appointment_date,
                status: appointmentData.status,
            });

            if (data.status) {

                setAppointmentData({
                    ...appointmentData,
                    user_id: '', animal_id: '', appointment_date: '', status: '',
                });

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

    return (
        <div>
            <h2> Agende um horário! </h2>
            <form>
                <button type="button" id="animal-button" onClick={registerAppointment}> Register </button>
            </form>
        </div>
    )

}

export default Appointments;