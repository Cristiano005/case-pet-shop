import { useState } from 'react';
import axiosInstance from '../../services/api';

function SignUp() {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    async function signup() {

        try {

            const { data } = await axiosInstance.post('/api/v1/users', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            });

            if (data.status) {
                setUserData({
                    ...userData,
                    name: '', email: '', password: '',
                });
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2> Faça seu Sign Up </h2>
            <form>
                <input type="text" name="name" value={userData.name} placeholder="Input your name" id="name" onChange={e => {
                    setUserData({
                        ...userData, name: e.target.value,
                    })
                }} />
                <input type="text" name="email" value={userData.email} placeholder="Input your email" id="email" onChange={e => {
                    setUserData({
                        ...userData, email: e.target.value,
                    })
                }} />
                <input type="password" name="password" value={userData.password} placeholder="Input your password" id="password" onChange={e => {
                    setUserData({
                        ...userData, password: e.target.value,
                    })
                }} />
                <button type="button" id="signup-button" onClick={signup}> Register </button>
            </form>

            <p>
                name: {userData.name}
            </p>
            <p>
                email: {userData.email}
            </p>
            <p>
                password: {userData.password}
            </p>
        </div>
    )

}

export default SignUp;