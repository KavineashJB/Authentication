import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import api from '../ApiClient/api';

const ResetPassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: email ? email : '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/resetpass', data);
            console.log(response.data);
            if (response.data.success) {
                navigate(`/${data.email}`)
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className="main_container">
            <div>
                <h1>Reset Password</h1>
            </div>
            <div className='input_field'>
                <label htmlFor="">New Password</label>
                <input type="password" name='password' value={data.password} onChange={handleChange} placeholder='Enter new password' />
            </div>
            <div className='input_field'>
                <label htmlFor="">Confirm new password</label>
                <input type="password" name='confirm_password' value={data.confirm_password} onChange={handleChange} placeholder='re-enter new password' />
            </div>
            <div>
                <button onClick={handleSubmit}>Reset</button>
                <div><span onClick={() => navigate(`/`)}><b>login here!</b></span></div>
            </div>
        </div>
    )
}

export default ResetPassword