import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './SignUp.css'
import auth from '../../firebase.init';
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [myError, setMyError] = useState('')
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate()
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    if (user) {
        navigate('/')
    }
    useEffect(() => {
        if (error?.message || loading) {
            setMyError('')
        }
    }, [error?.message, loading])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (password.length < 8) {
            setMyError('Password must be at least 8 characters long')
            return
        }
        if (password !== confirmPassword) {
            setMyError('Confirm password did not matched')
            return
        }
        createUserWithEmailAndPassword(email, password)
    }
    return (
        <div className='form-container'>
            <div className="form-div">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="email-div">
                        <label htmlFor="email">E-mail</label> <br />
                        <input type="email" name="email" id="email" required onBlur={handleEmail} />
                    </div>
                    <div className="email-div">
                        <label htmlFor="password">Password</label> <br />
                        <input type="password" name="password" id="password" required onBlur={handlePassword} />
                    </div>
                    <div className="email-div">
                        <label htmlFor="password">Confirm Password</label> <br />
                        <input type="password" name="password" id="password" required onBlur={handleConfirmPassword} />
                    </div>
                    {
                        loading &&
                        <div className="loading">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    <p style={{ color: 'red' }}>{myError}</p>
                    <p style={{ color: 'red' }}>{error?.message}</p>
                    <button className="login" type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
};

export default SignUp;