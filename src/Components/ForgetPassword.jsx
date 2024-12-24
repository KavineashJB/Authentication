import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import api from '../ApiClient/api';

const ForgetPassword = () => {

    const { email } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: email ? email : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/forgetpass', data);
            console.log(response.data);
            navigate(`/verifyotp/${data.email}`)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className="main_container">
            <div>
                <h1>Forgot Password</h1>
            </div>
            <div className='input_field'>
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Enter your email' />
            </div>
            <div>
                <button onClick={handleSubmit}>submit</button>
                <div><span onClick={() => navigate('/')}><b>login here!</b></span></div>
            </div>
        </div>
    )
}

export default ForgetPassword