import React, { useState } from 'react'

import CustomButton from '../CustomButton/CustomButton'
import FormInput from '../FormInput/FormInput'
import { login } from '../../firebase/auth'

import './LogInForm.scss'

const LogInForm = () => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const { email, password } = userCredentials

    const handleSubmit = async event => {
        event.preventDefault()

        setLoading(true)
        try {
            await login(email, password)
        } catch (error) {
            setUserCredentials({ email: '', password: '' })
        }
        setLoading(false)
    }

    const handleChange = event => {
        const { name, value } = event.target

        setUserCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <div className='login-form-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    value={email}
                    onChange={handleChange}
                    type='email'
                    placeholder='Email'
                    required
                />
                <FormInput
                    name='password'
                    value={password}
                    onChange={handleChange}
                    type='password'
                    placeholder='Password'
                    required
                />
                <CustomButton type='submit' disabled={loading}>
                    Log In
                </CustomButton>
            </form>
        </div>
    )
}

export default LogInForm