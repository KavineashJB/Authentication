import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import api from '../ApiClient/api';

const Login = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [hint, setHint] = useState('');
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        email: email ? email : '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const response = await api.post('/login', data);
            setHint(response.data.message);
            if (response.data.success) {
                setSuccess(true)
                console.log(success);
            }

            if (response.data.message === 'Password Incorrect!') {
                setData({ ...data, ['password']: '' })
            }
            setData({
                email: '',
                password: ''
            })
        } catch (error) {
            setHint(error.response.data.message);
            setData({
                email: '',
                password: ''
            })
            setSuccess(false)
            console.log(success);
        }

    }

    return (
        <div className="main_container">
            <div>
                <h1>Login</h1>
            </div>
            <div className='input_field'>
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={data.email} onChange={handleChange} placeholder='Enter your email' />
            </div>
            <div className='input_field'>
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={data.password} onChange={handleChange} placeholder='Enter the password' />
            </div>
            <div>
                <button onClick={handleSubmit}>login</button>
                <div className={(success && 'success') || 'hint'}>{hint}</div>
                <div><span onClick={() => navigate(`/forgetpass/${data.email}`)}><b>forgot password</b></span></div>
                <div>Don't have an account? <span onClick={() => navigate('/register')}><b>Register here!</b></span></div>
            </div>
        </div>
    )
}

export default Login