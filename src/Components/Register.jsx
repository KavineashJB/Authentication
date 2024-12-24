import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import api from '../ApiClient/api';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/register', data);
            console.log(response.data);
            setData({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            })

        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className="main_container">
            <div>
                <h1>Register</h1>
            </div>
            <div className='input_field'>
                <label htmlFor="">Username</label>
                <input type="text" name='name' value={data.name} onChange={handleChange} placeholder='Enter your name' />
            </div>
            <div className='input_field'>
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Enter your email' />
            </div>
            <div className='input_field'>
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={data.password} onChange={handleChange} placeholder='Enter the password' />
            </div>
            <div className='input_field'>
                <label htmlFor="">Confirm password</label>
                <input type="password" name='confirm_password' value={data.confirm_password} onChange={handleChange} placeholder='re-enter the password' />
            </div>
            <div>
                <button onClick={handleSubmit}>Register</button>
                <div>already have an account? <span onClick={() => navigate('/')}><b>login here!</b></span></div>
            </div>
        </div>
    )
}

export default Register