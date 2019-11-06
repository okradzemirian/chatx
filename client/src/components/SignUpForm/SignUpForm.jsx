import React, { useState } from 'react'

import { signup } from '../../firebase/auth'
import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButton/CustomButton'
import './SignUpForm.scss'

const SignUpForm = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const { displayName, email, password } = userCredentials

    const handleSubmit = async event => {
        event.preventDefault()

        setLoading(true)
        try {
            await signup(email, password, { displayName })
        } catch (error) {}
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
        <div className='signup-form'>
            <h3 className='signup-form__title'>Sign Up</h3>
            <form className='signup-form__form' onSubmit={handleSubmit}>
                <FormInput
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    type='text'
                    placeholder='Full Name'
                />
                <FormInput
                    name='email'
                    value={email}
                    onChange={handleChange}
                    type='email'
                    placeholder='Email'
                />
                <FormInput
                    name='password'
                    value={password}
                    onChange={handleChange}
                    type='password'
                    placeholder='Password'
                />
                <CustomButton type='submit' disabled={loading}>
                    Sign Up
                </CustomButton>
            </form>
        </div>
    )
}

export default SignUpForm