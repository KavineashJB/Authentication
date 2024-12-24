import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import api from '../ApiClient/api';

const VerifyOtp = () => {
    const { email } = useParams()
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: email ? email : '',
        otp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/verifyotp', data);
            console.log(response.data);
            if (response.data.success) {
                navigate(`/resetpassword/${data.email}`)
            } else {
                setData({ ...data, ['otp']: '' })
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    const handleResendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:8000/forgetpass', data);
            console.log(response.data);
            setData({ ...data, ['otp']: '' })

        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="main_container">
            <div>
                <h1>Verify OTP</h1>
            </div>
            <div className='input_field'>
                <label htmlFor="">OTP</label>
                <input type="number" name='otp' value={data.otp} onChange={handleChange} placeholder='Enter OTP here...' />
            </div>
            <div className='otpbtns'>
                <button onClick={handleSubmit}>submit</button>
                <button id='resendbtn' onClick={handleResendOtp}>resend OTP</button>
            </div>
        </div>
    )
}

export default VerifyOtp